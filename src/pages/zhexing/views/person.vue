<template>
  <div>
    <a-layout style="height: 100%;">
      <a-layout-header style="position: sticky; top: 0; z-index: 2;">
        <div class="container">
          <nav-menu :currentKey="' '"></nav-menu>
        </div>
      </a-layout-header>
      <!--主页墙-->
      <div class="personalWall">
        <div class="bkImgContainer">
          <img :src="$root.user.uCover" alt />
        </div>

        <div class="profileInfoContainer">
          <div class="container">
            <a-row class="profileInfoRow">
              <a-col :md="6" :xs="0" :sm="0">
                <div class="profileAvatar">
                  <div class="profileAvatar-container">
                    <a-avatar
                      :src="user.uAvatar"
                      :size="190"
                      class="avatar"
                    >{{user.unickname ? user.unickname.substring(0, 1).toUpperCase() : " "}}</a-avatar>
                  </div>
                </div>
              </a-col>
              <a-col :span="12" style="position: relative" @selectstart.prevent></a-col>
              <a-col :md="6" :xs="0" :sm="0" @selectstart.prevent>
                <div v-if="$root.user.uname !== uname">
                  <a-button
                    v-if="action === 0"
                    type="primary"
                    class="user-card-btn"
                    @click="handleFollow(true)"
                  >关注</a-button>
                  <div v-else-if="action === 1">
                    <a-button
                      type="danger"
                      icon="close"
                      class="user-card-btn"
                      @mouseleave="showFollowHandler"
                      @click="handleFollow(false)"
                      v-if="showUnFollow"
                    >取消关注</a-button>
                    <a-button
                      type="primary"
                      icon="check"
                      class="user-card-btn"
                      @mouseenter="showUnFollowHandler"
                      v-else
                    >正在关注</a-button>
                  </div>
                  <div v-else-if="action === 2">
                    <a-button
                      type="danger"
                      icon="close"
                      class="user-card-btn"
                      @mouseleave="showFollowHandler"
                      @click="handleFollow(false)"
                      v-if="showUnFollow"
                    >取消关注</a-button>
                    <a-button
                      type="primary"
                      icon="swap"
                      class="user-card-btn"
                      @mouseenter="showUnFollowHandler"
                      v-else
                    >互相关注</a-button>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
      <!-- 主页墙结束 -->
      <div class="container">
        <a-row :gutter="16">
          <!--左边-->
          <a-col :md="6" :xs="0" :sm="0">
            <a-row style="margin-top: 35px">
              <a-col :span="24">
                <div style="font-size: 21px;font-weight: bold; ">{{uname}}</div>
                <div
                  style="font-size: 14px;font-weight: normal; color: #657786;"
                >@{{user.unickname}}</div>
                <div>
                  <a-button
                    v-if="$root.user.uname !== uname"
                    type="primary"
                    style="border-radius: 24px"
                    @click="showChatModal(user.userId, user.uname, user.unickname, user.uAvatar)"
                  >私信</a-button>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <!--中间-->
          <a-col :md="12" :sm="24" :xs="24">
            <person-info :user="user" :uname="uname"></person-info>
          </a-col>
          <!--右边-->
          <a-col :md="6" :xs="0" :sm="0">
            <hot-tag-list></hot-tag-list>
            <more></more>
          </a-col>
        </a-row>
      </div>
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
import personInfo from '@/components/person/person-info'
import more from '@/components/home/more'

export default {
  name: "personal",
  components: {
    navMenu,
    hotTagList,
    personInfo,
    more
  },
  inject: ['reload'],
  data() {
    return {
      activeKey: null,
      uname: null,
      showUnFollow: false,
      btnType: 'primary',
      btnText: '关注',
      user: {
        userId: null,
        uname: null,
        unickname: null,
        uAvatar: null,
        postCount: 0,
        followingCount: 0,
        followerCount: 0,
        following: null,
        follower: null,
      }
    }
  },
  methods: {
    initUser() {
      this.uname = this.$route.params.uname
      this.userId = this.$route.params.userId
      this.axios.get(`index/person?uname=${this.uname}&userId=${this.$root.user.userId}`)
        .then(res => {
          window.console.log(res)
          let data = res.data.data
          if (data.userId === null || data === null) {
            this.goToSearch(this.$route.params.uname)
            return
          }
          this.user.userId = data.userId
          this.user.uname = data.uname
          this.user.unickname = data.unickname
          this.user.uAvatar = data.uchathead
          this.user.postCount = data.dynamicCount
          this.user.followingCount = data.followCount
          this.user.followerCount = data.followerCount
          this.user.following = data.following
          this.user.follower = data.follower
          document.title = `${this.user.unickname}(@${this.uname})`
        }, err => {
          window.console.log(err)
          this.goToSearch(this.$route.params.uname)
        })
    },
    callback(key) {
      this.$router.push(key)
    },
    goToSearch(value) {
      this.$router.push({
        name: 'search',
        query: {
          search: value
        }
      })
    },
    showUnFollowHandler() {
      this.showUnFollow = true
    },
    showFollowHandler() {
      this.showUnFollow = false
    },
    showChatModal(userId, uname, uAvatar) {
      window.console.log('clicked')
      this.$root.Bus.$emit('emitChatModal', userId, uname, uAvatar)
    },
    handleFollow(flag) {
      this.axios.post('follow/follow', this.$qs.stringify({
        userId: this.$root.user.userId,
        follower: this.user.userId,
        flag
      }), {
          headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => {
          window.console.log(res)
          if (flag) {
            this.user.following = 1
            this.user.followerCount++
            this.$message.success('关注成功')
          } else {
            this.user.following = null
            this.user.followerCount--
            this.$message.success('取消关注成功')
          }
        }, err => {
          window.console.log(err)
          this.$message.warning('网络繁忙，请稍后再试')
        })
    },
  },
  computed: {
    /*
      * 2：互相关注
      * 1：已关注
      * 0：未关注
      * */
    action() {
      if (this.user.following && this.user.follower) {
        return 2
      } else if (this.user.following) {
        return 1
      } else {
        return 0
      }
    }
  },
  watch: {
    $route() {
      this.reload()
    }
  },
  created() {
    this.initUser()
    this.activeKey = this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1)
  },
  beforeDestroy() {
    document.title = 'zhexing'
  }
}
</script>

<style scoped>
.personalWall {
  position: relative;
  margin-top: -15px;
}

.bkImgContainer {
  background: #dedede no-repeat 50%;
  overflow: hidden;
  position: relative;
}

@media (min-width: 300px) {
  .personalWall {
    height: 185px;
  }
  .bkImgContainer {
    height: 125px;
    background-size: 125px;
  }
}

@media (min-width: 992px) {
  .personalWall {
    height: 500px;
  }
  .bkImgContainer {
    height: 440px;
    background-size: 440px;
  }
}

.bkImgContainer img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
}

.profileInfoContainer {
  background-color: #ffffff;
  box-shadow: 0 1px 3px 3px #e8e8e8;
  border-top: 1px solid #e8e8e8;
}

.profileInfoRow > * {
  height: 60px;
  line-height: 60px;
}

.profileAvatar {
  position: absolute;
  top: -110px;
  background: #ffffff;
  border: 5px solid #ffffff;
  border-radius: 50%;
  height: 200px;
  width: 200px;
  overflow: hidden;
}
</style>