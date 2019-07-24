<template>
  <div id="any">
    <div class="container-fluid">
      <a-row class="app-row">
        <!-- 左边登录部分 -->
        <a-col class="app-col" :xs="24" :md="12">
          <div class="account col-md-6 col-sx-12">
            <div style="transition: all .5s">
              <p style="transition: all .5s">后台管理</p>
              <transition mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </div>
        </a-col>
        <!-- 左边登录部分结束 -->
        <!-- 右边信息部分 -->
        <a-col class="app-col" :xs="24" :md="12">
          <div class="intro">
            <div id="intromsg">
              <div class="info">
                <div>
                  <span class="myicon">
                    <a-icon type="cluster"/>
                  </span>
                  <span>&nbsp;者行后台管理</span>
                </div>
              </div>
              <div class="info">
                <div>
                  <span class="myicon">
                    <a-icon type="dot-chart"/>
                  </span>
                  <span>&nbsp;微服务数据监测</span>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <!-- 右边信息部分结束 -->
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "manage"
}
</script>

<style scoped lang="less">
.container-fluid {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  > .row {
    height: 100%;
  }
}

.intro {
  background-color: @primary-color;
}

#intromsg {
  > .info {
    color: #fff;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;

    line-height: 24px;
    margin: 48px auto;
    position: relative;
  }
}

.myicon {
  font-size: 30px;
}

/*入场过渡效果*/
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(140px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

@media only all and (min-width: 768px) {
  .intro,
  .account {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-row {
    height: 100%;
    .app-col {
      height: 100%;
    }
  }
}

@media only all and (max-width: 768px) {
  .intro,
  .account {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-row {
    height: 50%;
    .app-col {
      height: 100%;
    }
  }
}

.account {
  background-color: white;
}
</style>

<style lang="less">
body {
  font-family: "Segoe UI", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  font-weight: bold;
  background-color: #f0f2f5;
}
</style>