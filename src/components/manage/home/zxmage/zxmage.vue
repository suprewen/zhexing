<template>
  <a-layout>
    <a-layout-sider breakpoint="lg" collapsedWidth="0">
      <a-menu
        style="height: 100%; width: 100%"
        mode="inline"
        theme="dark"
        :inlineCollapsed="collapsed"
        @click="handleClick"
        :defaultSelectedKeys="keys"
        :defaultOpenKeys="['']"
      >
        <a-menu-item key="usermage">
          <a-icon type="team"/>
          <span>用户管理</span>
        </a-menu-item>

        <a-menu-item key="postmage">
          <a-icon type="snippets"/>
          <span>动态管理</span>
        </a-menu-item>
        <a-menu-item key="tagmage">
          <a-icon type="tag"/>
          <span>话题管理</span>
        </a-menu-item>
        <a-menu-item key="setmager">
          <a-icon type="setting"/>
          <span>管理员设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "zxmage",
  data() {
    return {
      collapsed: false,
      keys: [],
    }
  },
  methods: {
    handleClick(e) {
      this.$router.replace(e.key)
    },
  },
  created() {
    this.keys.push(this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1))
  }
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease;
}
</style>