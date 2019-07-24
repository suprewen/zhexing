<template>
  <a-list-item slot="renderItem" slot-scope="post" class="post-item">
    <div class="post-content">
      <input type="text" :value="post.dynamicId" style="display: none" />
      <!-- 动态上部分 -->
      <a-list-item-meta :description="post.publishTime.fromNow()">
        <router-link
          slot="title"
          :to="{name: 'person', params: {uname: post.uname, userId: post.userId}}"
        >
          {{post.unickname}}
          <span class="post-uname">{{'@'+post.uname}}</span>
        </router-link>
        <span slot="title" style="float: right;">
          <a-popover trigger="click" v-model="visible" placement="bottom">
            <div
              slot="content"
              v-if="post.uname === $root.user.uname"
              @click="deletePost(post.dynamicId, post.tnames)"
            >
              <a class="optionsa">
                <a-icon type="delete" />删除
              </a>
            </div>
            <div slot="content">
              <a class="optionsa">
                <a-icon type="dislike" />举报
              </a>
            </div>
            <a class="optionsa">
              <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>
            </a>
          </a-popover>
        </span>

        <a-avatar :size="48" slot="avatar" class="avatar" :src="post.uchathead">
          <router-link
            class="avatar"
            :to="{name: 'person', params: {uname: post.uname}}"
          >{{post.unickname? post.unickname.substring(0, 1).toUpperCase() : post.unickname }}</router-link>
        </a-avatar>
      </a-list-item-meta>
      <!-- 动态上部分结束 -->
      <!-- 动态内容部分 -->
      <a-row>
        <a-col :lg="{ span:21, offset:3 }" :xs="{ offset: 3 }" :sm="{ offset: 3 }">
          <div class="post-text-content" v-html="post.content"></div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :lg="{ offset: 3 }" :xs="{ offset: 3 }" :sm="{ offset: 3 }">
          <!-- TODO 极端一点修补后端乱返回数据的问题 -->
          <div class="post-imgs-container" v-if="post.imgList && post.imgList[0].src">
            <post-photos
              :list="post.imgList"
              :thumbImageStyle="{width: '120px', height: '120px', marginRight:'5px', marginTop: '5px'}"
              :previewBoxStyle="{width: '380px'}"
              :imgIndexClass="'img'+post.dynamicId"
            ></post-photos>
          </div>
        </a-col>
      </a-row>
      <!-- 动态内容部分结束 -->
      <!-- 动态下部分 -->
      <a-row class="post-btns">
        <a-col :span="4" :lg="{ offset: 3 }" :xs="{ offset: 3 }" :sm="{ offset: 3 }">
          <a @click="handleLikeClick(post.dynamicId, post.tnames)" @selectstart.prevent>
            <a-icon v-if="like" type="like" theme="filled" style="color: #1da1f2"></a-icon>
            <a-icon v-else type="like" />&nbsp;
            <span>{{likesNum}}</span>
          </a>
        </a-col>
        <a-col :span="4">
          <a @click="handleReviewClick(post.dynamicId)">
            <a-icon type="message" />&nbsp;
            <span v-text="post.commentsCount"></span>
          </a>
        </a-col>
        <a-col :span="4">
          <a @click="handleRetweetClick" @selectstart.prevent>
            <a-icon type="retweet" />
            <span>{{post.followsCount}}</span>
          </a>
        </a-col>
      </a-row>
    </div>
    <!-- 动态下部分结束 -->
    <!-- 动态评论部分 -->
    <div class="post-comment-container" v-if="commentClicked">
      <comment-creator :post="post" @getNewComment="getNewComment"></comment-creator>
      <comment-list
        v-if="post.commentsCount"
        :post="post"
        :postId="post.dynamicId"
        :tnames="post.tnames"
        :newComment="newComment"
      ></comment-list>
    </div>
    <!-- 动态评论部分结束 -->
  </a-list-item>
</template>

<script>
import postPhotos from './post-photos'
import commentCreator from './../comment/comment-creator'
import commentList from './../comment/comment-list'

export default {
  name: 'postItem',
  props: ['post'],
  components: {
    postPhotos,
    commentCreator,
    commentList
  },
  data() {
    return {
      visible: false,
      like: this.post.action,
      likesCount: this.post.likesCount,
      commentClicked: false,
      commentsCount: this.post.commentsCount,
      newComment: null,
    }
  },
  methods: {
    handleLikeClick(postId, tnames) {
      this.like = !this.like
      this.like ? this.likesCount++ : this.likesCount--
      window.console.log(tnames)
      this.axios.get(`/dynamic/likeDynamic?userId=${this.$root.user.userId}&dynamicId=${postId}&tnames=${encodeURIComponent(tnames)}&flag=${this.like}`)
        .then(res => {
          window.console.log(res)
        })
    },
    handleReviewClick() {
      this.commentClicked = !this.commentClicked
    },
    handleRetweetClick() {
      // TODO 转发
    },
    getNewComment(comment) {
      this.newComment = comment
    },
    deletePost(postId, tnames) {
      this.axios.get(`/dynamic/delete?dynamicId=${postId}&tnames=${encodeURIComponent(tnames)}`)
        .then(res => {
          window.console.log(res)
          if (res.data.status === 200) {
            this.visible = false
            this.$root.Bus.$emit('deleted', postId, tnames)
            this.$message.success('删除成功')
          }
        })

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
}
</script>

<style scoped lang="less">
.post-uname {
  font-size: 14px;
}

.post-text-content {
  font-size: 14px;
  font-weight: normal;
}

.post-imgs-container {
  margin-top: 5px;
}

.post-btns {
  margin-top: 15px;
  font-size: 16px;

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
}

.post-item:not(:first-child) {
  margin: 5px 0 0 0;
  padding: 0;
}

.post-item:first-child {
  margin: 2px 0 0 0;
  padding: 0;
}

.post-content {
  background-color: #ffffff;
  padding: 15px;
}

.post-comment-container {
  margin-top: 2px;
}

.optionsa {
  color: rgba(0, 0, 0, 0.4);
}
</style>

<style>
.ant-list-vertical .ant-list-item-meta-title {
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 0;
  font-size: 16px;
}

.ant-list-item-meta-description {
  font-size: 12px;
}

.ant-list-vertical .ant-list-item-content {
  margin: 0;
}

.ant-list-vertical .ant-list-item-meta {
  margin-bottom: 5px;
}

.thumbImg {
  cursor: pointer;
}

.post-imgs-container figure {
  width: 120px;
  height: 120px;
  overflow: hidden;
  display: inline-block;
  margin-right: 5px;
}

.post-imgs-container figure a,
.post-imgs-container figure a img {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>