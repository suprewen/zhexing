<template>
  <a-list-item slot="renderItem" slot-scope="item">
    <a-comment :author="item.uname">
      <!-- :avatar="item.uchathead" -->
      <template slot="actions">
        <span>
          <a-tooltip title="Like">
            <a-icon
              type="like"
              :theme="like ? 'filled' : 'outlined'"
              @click="handleLikeClick(item.commentId, item.tnames, item.postId)"
            />
          </a-tooltip>
          <span class="nums">{{likesNum}}</span>
        </span>
        <span>
          <a-tooltip title="replys">
            <a-icon type="message" @click="showReplys()"/>
          </a-tooltip>
          <span class="nums">{{item.commentsCount}}</span>
        </span>
        <span @click="showReplyCreator(item.commentId)">回复</span>
      </template>
      <a-avatar
        slot="avatar"
        :size="24"
        :src="item.uchathead"
        class="avatar"
      >{{item.unickname.substring(0, 1).toUpperCase()}}</a-avatar>
      <p slot="content">{{item.content}}</p>
      <a-tooltip slot="datetime" :title="item.commentTime.format('YYYY-MM-DD HH:mm:ss')">
        <span>{{item.commentTime.fromNow()}}</span>
      </a-tooltip>

      <comment-list
        v-if="item.commentsCount && replys"
        :postId="item.commentId"
        :post="item"
        :baseURL="'comment'"
        :newComment="newComment"
      ></comment-list>

      <a-modal
        :bodyStyle="{padding: 0}"
        v-model="visible"
        @close="handleClose"
        :title="'回复'+' '+item.uname"
        :closable="false"
        :footer="null"
      >
        <comment-reply-creator
          :id="item.commentId"
          :comment="item"
          :newComment="newComment"
          @getNewComment="getNewComment"
        ></comment-reply-creator>
      </a-modal>
    </a-comment>
  </a-list-item>
</template>

<script>
import commentList from './comment-list.vue'
import commentReplyCreator from './comment-reply-creator'

export default {
  name: "comment-item",
  props: ['item'],
  components: {
    commentReplyCreator,
    commentList
  },
  data() {
    return {
      replys: false,
      like: this.item.action,
      likesCount: this.item.likesCount,
      visible: false,
      newComment: null
    }
  },
  methods: {
    showReplyCreator() {
      this.visible = true
    },
    showReplys() {
      this.replys = !this.replys
    },
    handleLikeClick(commentid, tnames, postId) {
      this.like = !this.like
      this.like ? this.likesCount++ : this.likesCount--
      this.axios.get(`comment/likeComment?dynamicId=${postId}&commentId=${commentid}&userId=${this.$root.user.userId}&tnames=${tnames}&flag=${this.like}`)
        .then(res => {
          window.console.log(res)
        }, err => {
          window.console.log(err)
        })
    },
    handleClose() {
      this.visible = false
    },
    getNewComment(comment) {
      window.console.log(comment)
      this.newComment = comment
      this.handleClose()
    }
  },
  computed: {
    likesNum() {
      return this.likesCount
    },
    showComments() {
      return this.commentClicked
    }
  },
  created() {
  }
}
</script>

<style scoped lang="less">
a {
  color: #ccc;

  span {
    font-size: 12px;
    font-weight: normal;
  }
}

a:hover {
  color: #808080;
}
.nums {
  padding-left: 8px;
  cursor: auto;
}
</style>