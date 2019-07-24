<template>
  <div>
    <a-layout>
      <a-layout-header style="position: sticky; top: 0; z-index: 2;">
        <div class="container">
          <nav-menu :currentKey="' '"></nav-menu>
        </div>
      </a-layout-header>
      <div class="query-container">
        <div class="container">{{query}}</div>
      </div>
      <div class="tab-bar-container">
        <div class="background-div"></div>
        <div class="container">
          <a-row :gutter="16">
            <a-col :md="6" :xs="0" :sm="0" style="position: sticky; top: 26px;">
              <hot-tag-list style="margin-top: 59px"></hot-tag-list>
            </a-col>
            <a-col :md="12" :sm="24" :xs="24">
              <a-tabs :default-active-key="activeKey">
                <a-tab-pane tab="动态" key="posts">
                  <!-- TODO 搜索的接口呀 -->
                  <post-list :url="`Search/queryDynamic?q=${encodeURIComponent(query)}&`"></post-list>
                </a-tab-pane>
                <a-tab-pane tab="用户" key="users">
                  <!-- TODO 搜索的接口呀 -->
                  <user-card-list
                    :url="`search/getusers?userId=${this.$root.user.userId}&user=${query}&start=0&end=20`"
                  ></user-card-list>
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-col :md="6" :xs="0" :sm="0"></a-col>
          </a-row>
        </div>
      </div>
    </a-layout>
  </div>
</template>

<script>
import hotTagList from '@/components/home/hot-tag-list'
import navMenu from '@/components/home/nav-menu'
import postList from '@/components/home/post/post-list'
import userCardList from '@/components/home/card/user-card-list'

export default {
  name: "search",
  components: {
    navMenu,
    hotTagList,
    postList,
    userCardList
  },
  data() {
    return {
      activeKey: 'posts',
    }
  },
  methods: {

  },
  computed: {
    query() {
      return this.$route.query.search
    }
  },
  created() {

  }
}
</script>

<style scoped lang="less">
.query-container {
  background-color: @primary-color;
  font-size: 27px;
  color: #ffffff;
  margin-top: -15px;
  height: 64px;
  line-height: 64px;
}
.tab-bar-container {
  position: relative;
  .background-div {
    height: 45px;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: #ffffff;
  }
}
</style>