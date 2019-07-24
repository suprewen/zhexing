<template>
  <a-list class="comment-list" itemLayout="horizontal" :locale="{emptyText: ''}" v-if="data.length">
    <transition-group name="comment-list" tag="div">
      <comment-item v-for="item in data" :key="item.commentId" :item="item"></comment-item>
    </transition-group>
  </a-list>
</template>

<script>
import commentItem from './comment-item'
export default {
  name: "commentList",
  components: {
    commentItem
  },
  props: ['post', 'baseURL', 'newComment'],
  data() {
    return {
      data: [],
      // TODO 查看详情进入详情动态页面
      url: this.baseURL === 'comment' ? `comment/comment?parentId=${this.post.dynamicId}&userId=${this.$root.user.userId}` : `comment/hotComment?dynamicId=${this.post.dynamicId}&userId=${this.$root.user.userId}&start=0&n=50`
    }
  },
  methods: {
    like(i) {
      let d = this.data[i]
      if (d.action === 'liked')
        return
      d.likes++
      if (d.action === 'disliked')
        d.dislikes--
      d.action = 'liked'
    },
    dislike(i) {
      let d = this.data[i]
      if (d.action === 'disliked')
        return
      d.likes--
      if (d.action === 'liked')
        d.dislikes++
      d.action = 'disliked'
    },
    showReplyCreator() {
      window.alert('reply')
    }
  },
  watch: {
    newComment: function (newComment) {
      this.data.unshift(newComment)
    }
  },
  beforeCreate() {
    this.$options.components.postCommentItem = require('./comment-item.vue').default
  },
  created() {
    this.axios.get(this.url)
      .then(res => {
        window.console.log(res.data.data)
        for (let i in res.data.data) {
          res.data.data[i].commentTime = this.$moment(res.data.data[i].commentTime)
          res.data.data[i].tnames = this.post.tnames
          res.data.data[i].postId = this.post.dynamicId
        }
        this.data = res.data.data
      }, err => {
        window.console.log(err)
      })
  }
}
</script>

<style scoped>
.comment-list {
  background-color: #ffffff;
  margin-top: 2px;
  padding: 10px;
}

.comment-list-enter-active {
  transition: all 0.5s;
}
.comment-list-leave-active {
  position: absolute;
}

.comment-list-enter,
.comment-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.comment-list-move {
  transition: transform 0.5s;
}
</style>
<style>
.ant-comment-inner {
  padding: 0;
}
</style>