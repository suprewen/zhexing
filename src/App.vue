<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script>
export default {
  name: "zhexing",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style scoped>
</style>
<style lang="less">
@primary-color: #1da1f2;

html,
body,
#app {
  height: auto;
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  font-weight: bold;
  background-color: #f0f2f5;
}
.container-fluid {
  /*height: 100%;*/
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  > .row {
    height: 100%;
  }
}

/*响应式*/
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 10px;
}

@media (min-width: 576px) {
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
}

/*home*/
.ant-layout-header {
  background-color: #fff;
  color: @primary-color;
  height: auto;
  box-shadow: 0px 1px 0px 1px #e8e8e8;
  margin-bottom: 15px;
}
.ant-popover-inner .ant-menu {
  border-right: none;
}

* {
  transition: height 0.3s, width 0.3s, padding 0.3s, margin 0.3s, border 0.3s;
}

.avatar {
  color: #fff;
  background-color: #e8f5fd;
  font-weight: normal;
}
</style>