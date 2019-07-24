<template>
  <div>
    <a-layout style="height: 100%;">
      <a-layout-header style="position: sticky; top: 0; z-index: 2;">
        <div class="container">
          <nav-menu :currentKey="currentKey"></nav-menu>
        </div>
      </a-layout-header>
      <a-layout style="height: 100%;">
        <div class="container">
          <a-row :gutter="16">
            <!-- 左边内容 -->
            <a-col :lg="6" :md="8" :xs="0" :sm="0" style="position: sticky; top: -160px;">
              <div class="sticky">
                <a-row>
                  <user-card :user="user"></user-card>
                </a-row>
                <a-row>
                  <a-col>
                    <hot-tag-list></hot-tag-list>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <more></more>
                  </a-col>
                </a-row>
              </div>
            </a-col>
            <!-- 左边内容结束 -->
            <!-- 中间内容 -->
            <a-col :lg="12" :md="16" :sm="24" :xs="24">
              <a-row>
                <post-creator></post-creator>
              </a-row>
              <!-- 动态列表 -->
              <a-row style="margin-top: 0px">
                <a-tabs defaultActiveKey="1" style="margin-top: 5px">
                  <a-tab-pane tab="推荐" key="1">
                    <post-list :url="`/dynamic/recommend?`"></post-list>
                  </a-tab-pane>
                  <a-tab-pane tab="关注" key="2">
                    <post-list :url="`/dynamic/allFollowDynamic?`"></post-list>
                  </a-tab-pane>
                </a-tabs>
                <!-- 动态列表结束 -->
              </a-row>
            </a-col>
            <!-- 中间内容结束 -->
            <!-- 右边内容 -->
            <a-col :lg="6" :md="0" :xs="0" :sm="0"></a-col>
            <!-- 右边内容结束 -->
          </a-row>
        </div>
      </a-layout>
    </a-layout>
    <div>
      <a-back-top />
      <strong style="color: rgba(64, 64, 64, 0.6)"></strong>
    </div>
  </div>
</template>

<script>
import hotTagList from '@/components/home/hot-tag-list'
import navMenu from '@/components/home/nav-menu'
import userCard from '@/components/home/card/user-card'
import postCreator from '@/components/home/post/post-creator'
import postList from '@/components/home/post/post-list'
import more from '@/components/home/more'

export default {
  name: 'home',
  components: {
    hotTagList, navMenu, userCard, postCreator, postList, more
  },
  data() {
    return {
      currentKey: 'home',
      version: '',
      user: {
        // 要什么去 root 拿
        userId: this.$root.user.userId,
        unickname: this.$root.user.unickname,
        uname: this.$root.user.uname,
        uCover: this.$root.user.uCover,
        uAvatar: this.$root.user.uAvatar,
        dynamicCount: 0,
        followCount: 0,
        followerCount: 0,
      }
    }
  },
  methods: {
    initUser() {
      this.axios.get(`index/person?uname=${this.$root.user.uname}&userId=${this.$root.user.userId}`)
        .then(res => {
          let data = res.data.data
          if (data.userId === null) {
            //this.goToSearch(this.$route.params.personAccount)
            return
          }
          this.user.dynamicCount = data.dynamicCount
          this.user.followCount = data.followCount
          this.user.followerCount = data.followerCount
          this.user.uAvatar = data.uchathead
        }, err => {
          window.console.log(err)
        })
    },

  },
  beforeCreate() {
    if (!window.localStorage.getItem('token')) {
      // TODO push route
      this.$router.push('/index')
    }
  },
  created() {
    this.initUser()
  }
}
</script>

<style lang="css" scoped>
.ant-layout-content {
  height: 100%;
}
</style>

<style>
.ant-tabs-bar {
  margin: 0;
}
.ant-tabs-nav-container {
  background-color: #ffffff;
}
</style>
