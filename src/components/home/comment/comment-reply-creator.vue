<template>
  <div class="commentCreatorContainer">
    <a-row>
      <a-col :span="2">
        <img :src="this.$root.user.uAvatar" class="uAvatar">
      </a-col>
      <a-col :span="22">
        <div class="editerContainer">
          <a-textarea
            :class="{ 'editer': true }"
            placeholder="友善发言的人运气都不会太差"
            style="resize: none"
            v-model="inputContent"
          ></a-textarea>
        </div>
      </a-col>
    </a-row>
    <a-row class="btnsRow">
      <a-col :span="19" :offset="2">
        <a-row :gutter="8" class="btnsRow">
          <a-col :span="4">
            <a @click.prevent @mousedown.prevent>
              <a-icon type="picture"/>图片
            </a>
          </a-col>
          <a-col :span="4"></a-col>
        </a-row>
      </a-col>
      <a-col :span="3">
        <a-button
          type="primary"
          class="btn postBtn"
          :disabled="!inputContent.length"
          @click="sendCommentBtnClickEventHandler"
        >发布</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  name: "commentReplyCreator",
  components: {

  },
  props: ['comment', 'newComment'],
  data() {
    return {
      inputContent: '',
    }
  },
  methods: {
    commentHandler() {
      let data = {
        dynamicId: this.comment.dynamicId,
        parentId: this.comment.commentId,
        userId: this.$root.user.userId,
        content: this.inputContent
      }
      return data
    },
    sendCommentBtnClickEventHandler() {
      let data = this.commentHandler()
      this.axios({
        url: 'comment/comment',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: this.$qs.stringify(data)
      })
        .then(res => {
          this.$message.success('评论成功')
          this.$emit('getNewComment', res.data.data)
        }, err => {
          window.console.log(err)
        })

      this.inputContent = ''
    },
  },
}
</script>

<style scoped>
.commentCreatorContainer {
  border: 1px solid #e6ecf0;
  background-color: #e8f5fd;
  padding: 10px 12px;
}

.uAvatar {
  border-radius: 50%;
  overflow: hidden;
  width: 80%;
}
.editerContainer {
  line-height: 20px;
}

.editer {
  width: 100%;
  color: #1da1f2;
  border: 1px solid #c6e7fb;
  border-radius: 8px;
  height: 100px;
  overflow: hidden;
  font-size: 14px;
}

.btnsRow {
  margin-top: 5px;
  font-size: 16px;
}

.postBtn {
  margin: 5px 3px 0 auto;
  border: 1px solid #1da1f2;
  color: #fff;
  background-color: #4ab3f4;
  padding: 2px 12px;
  font-size: 14px;
  border-radius: 100px;
}
</style>