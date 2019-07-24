<template>
  <div
    class="infinite-container"
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list itemLayout="vertical" :split="false" :locale="{emptyText: '暂时没有内容哦'}">
      <transition-group name="postlist" tag="div">
        <post-item
          v-for="post in posts"
          :post="post"
          :key="post.dynamicId"
          @deletePost="deletePost()"
        ></post-item>
      </transition-group>
    </a-list>

    <div v-if="loading && !busy" class="loading-container">
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
    </div>
    <div v-if="empty && posts.length !== 0">
      <p class="empty-tip">已经到底了哦</p>
    </div>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import postItem from './post-item'

let start = -10
let postNum = 10
let status = 200

export default {
  name: 'postList',
  props: ['url'],
  components: {
    postItem
  },
  inject: ['reload'],
  directives: { infiniteScroll },
  data() {
    return {
      posts: [],
      loading: false,
      busy: false,
      empty: false
    }
  },
  methods: {
    fetchData(callback) {
      if (postNum !== 10 || status !== 200) {
        this.loading = false
        this.empty = true
        return
      }
      this.axios.get(`${this.url}start=${start += 10}&end=10&userId=${this.$root.user.userId}`)/* &tname=${encodeURIComponent()} */
        .then(res => {
          if (res.data.status !== 200) {
            this.loading = false
            status = res.data.status
            return
          }
          for (let i in res.data.data) {
            res.data.data[i].publishTime = this.$moment(res.data.data[i].publishTime)
            res.data.data[i].imgList = this.handleImgList(res.data.data[i].imgList)
          }
          callback(res.data)
        }, err => {
          window.console.log(err)
          this.loading = false
        })
    },
    handleInfiniteOnLoad() {
      this.loading = true
      if (this.posts.length > 1000) {
        this.$message.warning('Infinite List loaded all')
        this.busy = true
        this.loading = false
        return
      }
      this.fetchData((data) => {
        postNum = data.data.length
        this.posts = this.posts.concat(data.data)
        this.loading = false
      })
    },
    handleImgList(imgList) {
      let newImgList = imgList
      for (let i in newImgList) {
        let image = new Image()
        image.src = newImgList[i].src
        image.onload = function () {
          let w = this.width
          let h = this.height
          newImgList[i].w = w || 0
          newImgList[i].h = h || 0
        }
      }
      return newImgList
    },
    addPost(post) {
      this.posts.unshift(post)
    },
    deletePost(index) {
      this.posts.splice(index, 1)
    }
  },
  created() {
    start = -10
    postNum = 10
    status = 200
    this.$root.Bus.$on('addPost', post => {
      this.addPost(post)
    })
    this.$root.Bus.$on('deleted', postId => {
      let index = this.posts.findIndex((post) => {
        return post.dynamicId === postId
      })
      this.deletePost(index)
    })
  },
  watch: {
    // TODO 搜索页面需观察参数变化需重新请求数据
    //????你怎么写好了??
    url() {
      start = -10
      postNum = 10
      this.posts = []
      this.loading = true
      this.fetchData((data) => {
        postNum = data.data.length
        this.posts = this.posts.concat(data.data)
        this.loading = false
      })
    },
  },
}
</script>

<style lang="css" scoped>
.infinite-container {
  margin-top: 15px;
}
.empty-tip {
  text-align: center;
  margin-top: 10px;
  color: grey;
}

.postlist-enter-active {
  transition: all 0.5s;
}
.postlist-leave-active {
  position: absolute;
}

.postlist-enter,
.postlist-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.postlist-move {
  transition: transform 0.5s;
}
</style>