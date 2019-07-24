<template>
  <div class="userCardContainer" v-if="user">
    <!-- v-if="user.uname" -->
    <router-link
      tag="div"
      :to="{name: 'person', params: {uname: user.uname}}"
      class="uCover"
      :style="`background-image: url(${$root.user.uCover})`"
    ></router-link>
    <div class="userContentContainer">
      <a-row>
        <a-col :span="8">
          <a-avatar
            :src="user.uAvatar"
            :size="68"
            style="font-weight: normal;"
            class="uAvatar avatar"
          >{{user.unickname.substring(0, 1).toUpperCase()}}</a-avatar>
        </a-col>

        <a-col :span="16">
          <div class="unickname">
            <router-link
              tag="span"
              :to="{name: 'person', params: {uname: user.uname}}"
            >{{user.unickname}}</router-link>
          </div>
          <div class="uname">
            <router-link
              tag="span"
              :to="{name: 'person', params: {uname: user.uname}}"
            >@{{user.uname}}</router-link>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="userInfo">
          <div class="userPosts">
            <div class="Title">
              <span>动态</span>
            </div>
            <div class="Count">
              <span>{{user.dynamicCount}}</span>
            </div>
          </div>
        </a-col>
        <a-col :span="8" class="userInfo">
          <div class="userFollowing">
            <div class="Title">
              <span>关注</span>
            </div>
            <div class="Count">
              <span>{{user.followCount}}</span>
            </div>
          </div>
        </a-col>
        <a-col :span="8" class="userInfo">
          <div class="userFollowing">
            <div class="Title">
              <span>粉丝</span>
            </div>
            <div class="Count">
              <span>{{user.followerCount}}</span>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row style="text-align: center" v-if="showBtns">
        <div v-if="$root.user.uname !== user.uname">
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
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userCard',
  props: ['user', 'showBtns'],
  data() {
    return {
      showUnFollow: false
    }
  },
  methods: {
    showUnFollowHandler() {
      this.showUnFollow = true
    },
    showFollowHandler() {
      this.showUnFollow = false
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
          } else {
            this.user.following = null
            this.user.followerCount--
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
}
</script>

<style lang="css" scoped>
.userCardContainer {
  position: relative;
  background-color: white;
  overflow: hidden;
}
.uCover {
  height: 95px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}
/* .uAvatar {
  border-radius: 50%;
  height: 68px;
  width: 68px;
  border: 2px solid #fff;
  box-sizing: border-box;
  overflow: hidden;
  color: #fff;
  margin: -30px 0 0 8px;
  cursor: pointer;
} */
.uAvatar {
  border: 2px solid #fff;
  margin: -30px 0 0 8px;
}
.unickname {
  font-weight: bold;
}
.uname {
  font-size: 12px;
  color: #66757f;
}
.unickname span,
.uname span {
  cursor: pointer;
}
.userInfo {
  padding: 16px;
}
.userInfo > div {
  font-size: 12px;
  font-weight: bold;
  color: #657786;
}
.Count {
  color: #1da1f2;
  font-weight: bold;
  padding-top: 3px;
}
</style>

<style>
.user-card-btn {
  border-radius: 24px;
  margin-bottom: 5px;
  font-weight: bold;
}
@media (min-width: 300px) {
  .Count,
  .uname {
    font-size: 12px;
  }
  .user-card-btn {
    width: 80%;
  }
}
@media (min-width: 992px) {
  .Count,
  .uname {
    font-size: 18px;
  }
  .user-card-btn {
    width: 50%;
  }
}
</style>