<template>
  <a-layout style="height: 100%">
    <!-- 头部 -->
    <a-layout-header>
      <div class="container">
        <nav-menu :current-key="``"></nav-menu>
      </div>
    </a-layout-header>
    <!-- 头部结束 -->
    <!-- 身体部分 -->
    <a-layout>
      <div class="container">
        <a-row :gutter="16">
          <!-- 左边菜单 -->
          <a-col :span="6">
            <user-card></user-card>
            <a-menu style mode="vertical" :defaultSelectedKeys="['1']">
              <a-menu-item key="1">
                <router-link to="account" tag="div">
                  <a-icon type="mail" />账号
                </router-link>
              </a-menu-item>

              <a-menu-item key="2">
                <router-link to="password" tag="div">
                  <a-icon type="calendar" />密码
                </router-link>
              </a-menu-item>
            </a-menu>
            <a-row>
              <a-col>
                <more></more>
              </a-col>
            </a-row>
          </a-col>
          <!-- 左边菜单结束 -->
          <!-- 右边 -->
          <a-col :span="18">
            <div>
              <router-view></router-view>
            </div>
          </a-col>
          <!-- 右边结束 -->
        </a-row>
      </div>
    </a-layout>
    <!-- 身体部分结束 -->
  </a-layout>
</template>

<script>
import navMenu from '@/components/home/nav-menu'
import userCard from '@/components/home/card/user-card'
import more from '@/components/home/more'

export default {
  name: "settings",
  components: {
    navMenu,
    userCard,
    more
  },
  data() {
    return {}
  },
  methods: {},
  beforeCreate() {
    if (!window.localStorage.getItem('token')) {
      this.$router.push('/index')
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  /* width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    position: relative; */
}

/*   @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }

  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }

  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }
  }

  @media (min-width: 1200px) {
    .container {
      max-width: 1190px;
    }
  } */
</style>