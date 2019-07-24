<template>
  <div class="nav-container">
    <a-tabs default-active-key="posts">
      <a-tab-pane key="posts">
        <div class="tab-pane-container" slot="tab">
          <span class="tab">动态</span>
          <br>
          <span class="tab-numbers">{{user.postCount}}</span>
        </div>
        <post-list :url="`dynamic/followDynamic?uname=${uname}&`"></post-list>
      </a-tab-pane>
      <a-tab-pane key="following">
        <div class="tab-pane-container" slot="tab">
          <span class="tab">关注</span>
          <br>
          <span class="tab-numbers">{{user.followingCount}}</span>
        </div>
        <user-card-list :url="`follow/following?userId=${user.userId}&`"></user-card-list>
      </a-tab-pane>
      <a-tab-pane key="follower">
        <div class="tab-pane-container" slot="tab">
          <span class="tab">粉丝</span>
          <br>
          <span class="tab-numbers">{{user.followerCount}}</span>
        </div>
        <user-card-list :url="`follow/follower?follower=${user.userId}&`"></user-card-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import postList from './../home/post/post-list'
import userCardList from './../home/card/user-card-list'

export default {
  name: "person-info",
  components: {
    postList,
    userCardList
  },
  props: ['user', 'uname'],
  created() {

  }
}
</script>

<style scoped>
.nav-container {
  margin-top: -53px;
}
.tab-pane-container {
  text-align: center;
}
.tab-pane-container .tab {
  font-size: 12px;
  font-weight: bold;
  color: #657786;
}
.tab-pane-container .tab-numbers {
  font-size: 18px;
  font-weight: bold;
}
</style>

<style>
.nav-container .ant-tabs-tab {
  padding-top: 0;
  padding-bottom: 7px;
}
</style>