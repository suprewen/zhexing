<template>
  <div class="comment-creator-container">
    <!-- 评论发布上半部分 -->
    <a-row>
      <a-col :span="2" class="avatarCol">
        <a-avatar
          :src="$root.user.uAvatar"
          :size="24"
          class="avatar"
        >{{$root.user.unickname.substring(0, 1).toUpperCase()}}</a-avatar>
      </a-col>
      <a-col :span="22">
        <div class="EditerContainer">
          <a-textarea
            class="Editer"
            placeholder="友善发言的人运气都不会太差"
            v-model="inputContent"
          >友善发言的人运气都不会太差</a-textarea>
        </div>
      </a-col>
    </a-row>
    <!-- 评论发布上半部分结束 -->
    <!-- 评论发布下半部分 -->
    <a-row class="btnsRow">
      <a-col :span="19" :offset="2" class="comment-btns">
        <a @click.prevent @mousedown.prevent style="font-size: 14px">
          <a-icon type="picture" style="font-size: 16px"/>&nbsp;图片
        </a>
      </a-col>
      <a-col :span="3">
        <a-button
          type="primary"
          class="btn PostBtn"
          :disabled="!inputContent.length"
          @mousedown="sendCommentBtnClickEventHandler"
        >发布</a-button>
      </a-col>
    </a-row>
    <!-- 评论发布下半部分结束 -->
  </div>
</template>

<script>
export default {
  name: "commentCreator",
  props: ['post'],
  data() {
    return {
      isEditerFocused: false,
      inputContent: '',
    }
  },
  methods: {
    postHandler() {
      let data = {
        dynamicId: this.post.dynamicId,
        userId: this.$root.user.userId,
        content: this.inputContent,
        tnames: this.post.tnames
      }
      return data
    },
    sendCommentBtnClickEventHandler() {
      let data = this.postHandler()
      this.axios({
        url: 'comment/dynamic',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: this.$qs.stringify(data)
      })
        .then(res => {
          window.console.log(res)
          this.post.commentsCount++
          this.$message.success('评论成功')
          res.data.data.commentTime = this.$moment(res.data.data.commentTime)
          res.data.data.commentsCount = 0
          res.data.data.likesCount = 0
          res.data.data.uchathead = this.$root.user.uAvatar
          res.data.data.uname = this.$root.user.uname
          res.data.data.unickname = this.$root.user.unickname
          this.$emit('getNewComment', res.data.data)
        }, err => {
          window.console.log(err)
        })

      this.inputContent = ''
    },
  }
}
</script>

<style scoped>
.comment-creator-container {
  background-color: #ffffff;
  padding: 5px;
}

.avatarCol {
  display: flex;
  justify-content: center;
}

.EditerContainer {
  line-height: 20px;
}

.Editer {
  width: 100%;
  height: 45px;
  color: #1da1f2;
  background: #fff;
  border: 1px solid #c6e7fb;
  border-radius: 8px;
  overflow: auto;
  font-size: 14px;
  resize: none;
}

.Editerfocus {
  border-radius: 8px;
  height: 100px;
}

.btnsRow {
  margin-top: 5px;
  font-size: 16px;
}

.PostBtn {
  display: block;
  margin: 0px 3px 0 auto;
  padding: 2px 9px;
  border: 1px solid #1da1f2;
  border-radius: 100px;
  background-color: #4ab3f4;
  color: #fff;
  font-size: 14px;
}
</style>