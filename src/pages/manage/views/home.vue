<template>
  <a-layout class="management-container">
    <a-layout-header style="margin-bottom: 0; background-color: #001529">
      <a-row>
        <a-col :span="3">
          <span style="font-family: Monoton, cursive">zhexing</span>
        </a-col>
        <a-col :span="21">
          <a-menu
            theme="dark"
            mode="horizontal"
            :defaultSelectedKeys="['zxmage']"
            :style="{ lineHeight: '64px' }"
            @click="switchPages"
          >
            <a-menu-item key="zxmage">者行后台管理</a-menu-item>
            <a-menu-item key="server">微服务数据监测</a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </a-layout-header>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </a-layout>
</template>

<script>
export default {
  name: "zx-manage",
  data() {
    return {

    }
  },
  methods: {
    switchPages(e) {
      this.$router.replace({ name: e.key })
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Monoton);
@import url(https://fonts.googleapis.com/css?family=Great+Vibes);

.management-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease;
}
</style>