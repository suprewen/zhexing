<template>
  <div class="postCreatorContainer">
    <!-- 输入框 -->
    <a-row>
      <a-col :span="2">
        <a-avatar
          :src="$root.user.uAvatar"
          :size="36"
          class="avatar"
        >{{$root.user.unickname.substring(0, 1).toUpperCase()}}</a-avatar>
      </a-col>
      <a-col :span="22">
        <div class="EditerContainer">
          <a-textarea
            :class="{ 'Editer': true, 'Editerfocus': isEditerFocused }"
            placeholder="分享点好东西..."
            style="resize: none"
            @focus="editorFocused"
            @blur="editorBlured"
            v-model="inputContent"
          >分享点好东西...</a-textarea>
        </div>
        <div v-if="photoHasBeenUpload">
          <figure
            class="photo-figure"
            v-for="(photo, index) in photos"
            :key="index"
            @mousedown.prevent
          >
            <a-icon
              type="close-circle"
              theme="filled"
              @click="removePhoto(index)"
              class="close-photo-icon"
            />
            <img :src="photo">
          </figure>
        </div>
      </a-col>
    </a-row>
    <!-- 输入框结束 -->
    <!-- 发动态功能部分 -->
    <a-row class="row" v-show="isEditerFocused">
      <a-col :span="19" :offset="2">
        <a-row :gutter="8" class="row">
          <a-col :md="4" :sm="6" :xs="6">
            <input
              name="image"
              ref="photoUpload"
              @change="handlePhotoUpload"
              type="file"
              accept="image/*"
              style="display: none"
            >
            <a @click.prevent="triggerFileUpload" @mousedown.prevent>
              <a-icon type="picture"/>图片
            </a>
          </a-col>
          <a-col :md="4" :sm="6" :xs="6">
            <a @mousedown.prevent="handleAddTagEvent">
              <a-icon type="tag"/>话题
            </a>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="3">
        <a-button
          type="primary"
          class="PostBtn"
          :disabled="!inputContent.length && !photos.length"
          @mousedown="sendPostBtnClickEventHandler"
        >发布</a-button>
      </a-col>
    </a-row>
    <!-- 发动态功能部分结束 -->
    <!-- 搜索话题部分 -->
    <a-row>
      <a-col :span="22" :offset="2" v-show="showTagInput">
        <a-auto-complete
          style="width: 100%"
          :dataSource="tags"
          :filterOption="filterOption"
          class="tag-search-input"
          placeholder="搜索话题"
          @select="getSelectedTagHandler"
          allowClear
        >
          <a-input style="border-radius: 24px;"></a-input>
        </a-auto-complete>
      </a-col>
    </a-row>
    <!-- 搜索话题部分结束 -->
  </div>
</template>

<script>
export default {
  name: 'postCreator',
  data() {
    return {
      inputContent: '',
      showTagInput: false,
      isEditerFocused: false,
      photos: [],
      images: [],
      mimages: [],
      tags: []
    }
  },
  methods: {
    editorFocused() {
      this.isEditerFocused = true
    },
    editorBlured() {
      if (!this.photos.length && !this.showTagInput) this.isEditerFocused = false
    },
    triggerFileUpload() {
      if (this.photos.length < 9)
        this.$refs.photoUpload.click()
    },
    handlePhotoUpload(e) {
      let file = e.target.files[0]
      let param = new FormData()
      let photos = this.photos
      param.append('uploadFile', file)

      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = e => {
        photos.push(e.target.result)
      }

      this.axios({
        url: '/social/upload/file',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: param,
      })
        .then(res => {
          this.images.push(res.data.data.images)
          this.mimages.push(res.data.data.mimages)
        }, err => {
          window.console.log(err)
        })
    },
    removePhoto(index) {
      this.photos.splice(index, 1)
    },
    handleAddTagEvent() {
      this.showTagInput = !this.showTagInput
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
    },
    getSelectedTagHandler(value) {
      this.inputContent += ` #${value}# `
    },
    postHandler() {
      let tags = this.inputContent.match(/#(\S*?)#/g)
      let tagData = ''
      for (let i in tags) {
        tagData += tags[i] + ' '
        this.inputContent = this.inputContent.replace(new RegExp(tags[i], 'gm'), `<a href="search?search=${encodeURIComponent(tags[i])}">${tags[i]}</a>`)
      }

      let reg = new RegExp('\\n', 'g')
      this.inputContent = this.inputContent.replace(reg, '<br>')

      let images = ''
      for (let i in this.images) {
        images += `${this.images[i]} `
      }

      let mimages = ''
      for (let i in this.mimages) {
        mimages += `${this.mimages[i]} `
      }

      let postData = {
        userId: this.$root.user.userId,
        uname: this.$root.user.uname,
        unickname: this.$root.user.unickname,
        uchathead: this.$root.user.uAvatar,
        content: this.inputContent,
        images,
        mimages,
        tnames: tagData
      }
      return postData
    },
    sendPostBtnClickEventHandler() {
      let data = this.postHandler()
      this.axios({
        url: '/dynamic/publish',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: this.$qs.stringify(data)
      })
        .then(res => {
          res.data.data.publishTime = this.$moment(res.data.data.publishTime)
          this.$root.Bus.$emit('addPost', res.data.data)
        }, err => {
          window.console.log(err)
        })

      this.inputContent = ''
      this.photos = []
      this.showPhotos = []
      this.images = []
      this.mimages = []
    },
  },
  computed: {
    photoHasBeenUpload() {
      return this.photos.length > 0
    }
  }
}
</script>

<style lang="css" scoped>
.postCreatorContainer {
  border: 1px solid #e6ecf0;
  background-color: #e8f5fd;
  padding: 10px 12px;
}
.uAvatar {
  border-radius: 50%;
  overflow: hidden;
  width: 80%;
  position: relative;
}
.EditerContainer {
  position: relative;
  line-height: 20px;
}
.Editer {
  color: #1da1f2;
  background: #fff;
  border: 1px solid #c6e7fb;
  border-radius: 24px;
  height: 35px;
}
.Editerfocus {
  border-radius: 8px;
  height: 100px;
}
.row {
  margin-top: 5px;
  font-size: 16px;
}
.PostBtn {
  margin: 5px 3px 0 auto;
  padding: 2px 12px;
  border: 1px solid #1da1f2;
  border-radius: 100px;
  color: #fff;
  background-color: #4ab3f4;
  font-size: 14px;
}
.photo-figure {
  background-color: #2c3e50;
  border-radius: 5%;
  display: inline-block;
  margin-top: 5px;
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
}
.photo-figure img {
  height: 100%;
  width: 100%;
}
.close-photo-icon {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  right: 3%;
  top: 3%;
}
.close-photo-icon:hover {
  cursor: pointer;
}
.tag-search-input {
  margin-top: 5px;
}
</style>

<style>
.ant-select-auto-complete.ant-select .ant-select-selection--single,
.ant-select-search--inline .ant-select-search__field {
  border-radius: 24px;
}
</style>