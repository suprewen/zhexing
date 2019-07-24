<template>
  <div style="position: relative; height: 100%">
    <div class="management-container">
      <a-layout style="height: 100%">
        <a-layout>
          <a-layout-sider breakpoint="lg" collapsedWidth="0">
            <a-menu
              style="height: 100%; width: 100%"
              mode="inline"
              theme="dark"
              :inlineCollapsed="collapsed"
              @click="handleClick"
              :defaultSelectedKeys="[src]"
              :defaultOpenKeys="['register']"
            >
              <a-sub-menu key="register">
                <span slot="title">
                  <a-icon type="gold" />服务注册中心
                </span>
                <a-menu-item key="http://192.168.43.19:8001">eureka01</a-menu-item>
                <a-menu-item key="http://192.168.43.151:8002">eureka02</a-menu-item>
              </a-sub-menu>

              <a-menu-item key="http://192.168.43.19:9999/hystrix">
                <a-icon type="dashboard" />
                <span>请求仪表盘</span>
              </a-menu-item>
              <a-menu-item key="http://192.168.43.19:9411">
                <a-icon type="link" />
                <span>链路追踪</span>
              </a-menu-item>
              <!-- <a-sub-menu>
                <span slot="title">
                  <a-icon type="setting"/>
                  <span>服务配置</span>
                </span>
                <a-menu-item v-for="(item,index) in keys" :key="index">{{item}}</a-menu-item>
              </a-sub-menu>-->
            </a-menu>
          </a-layout-sider>
          <a-layout>
            <a-layout-content style="overflow: hidden">
              <transition mode="out-in">
                <router-view :src="src" :data="data" :keyNum="keyNum"></router-view>
              </transition>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </a-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: "server",
  data() {
    return {
      collapsed: false,
      src: 'http://192.168.43.19:8001', //121
      data: [],
      keys: [],
      keyNum: 0,
    }
  },
  methods: {
    handleClick(e) {
      window.console.log('click ', e)
      if (parseInt(e.key) >= 0) {
        this.keyNum = parseInt(e.key)
        this.$router.push('sourceProperty')
      } else {
        this.$router.push('frame')
        this.src = e.key
      }

    },
  },
  created() {
    this.axios.get('http://192.168.43.19:3333/bootstrap/dev')
      .then(res => {
        window.console.log(res.data)
        window.console.log(res.data.propertySources[0].source['eureka.instance.instance-id'])
        this.data = res.data.propertySources
        let ps = res.data.propertySources
        for (let i in ps) {
          this.keys.push(ps[i].source['spring.application.name'])
        }
      })
    window.console.log('this is server page')
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
  transform: translateY(30px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease;
}
</style>