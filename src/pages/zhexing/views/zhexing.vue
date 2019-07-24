<template>
  <div id="app">
    <div class="container-fluid">
      <a-row class="row">
        <!-- 左边介绍 -->
        <a-col class="col" :xs="24" :md="12">
          <div class="intro">
            <div id="intromsg">
              <div class="info">
                <div>
                  <span class="myicon">
                    <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
                  </span>
                  <span>看看最近在发生什么</span>
                </div>
              </div>
              <div class="info">
                <div>
                  <span class="myicon">
                    <font-awesome-icon :icon="['fas', 'assistive-listening-systems']"></font-awesome-icon>
                  </span>
                  <span>听听大家在讨论什么</span>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <!-- 左边介绍结束 -->
        <!-- 右边登录 -->
        <a-col class="col" :xs="24" :md="12">
          <div class="account col-md-6 col-sx-12">
            <div style="transition: all .5s">
              <p style="transition: all .5s">即刻使用</p>
              <transition mode="out-in">
                <router-view @showModal="showModal"></router-view>
              </transition>
            </div>
          </div>
        </a-col>
        <!-- 右边登录结束 -->
        <!-- 注册模态框 -->
        <a-modal :footer="null" title="注册" :visible="visible" @cancel="handleCancel">
          <signup></signup>
        </a-modal>
        <!-- 模态框结束 -->
      </a-row>
    </div>
  </div>
</template>

<script>
import signup from '@/components/index/signup'

export default {
  name: 'app',
  components: {
    signup
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    handleAutologin(token) {
      this.axios.get(`autoLogin?token=${token}`)
        .then(res => {
          window.console.log(res.data)
          if (res.data.status === 200) {
            this.$router.push('/home')
          } else {
            this.$root.clearStorage()
          }
        }, err => {
          window.console.log(err)
        })
    }
  },
  created() {
    this.$root.Bus.$on('success', () => {
      this.handleCancel()
    })
    let token = window.localStorage.getItem('token')
    if (token) {
      this.handleAutologin(token)
    }
  },
  mounted() { },
  beforeDestory() {
    this.$root.Bus.$off('success')
  }
};
</script>

<style lang="less" scoped>
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

  .row {
    height: 100%;

    .col {
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

  .row {
    height: 50%;

    .col {
      height: 100%;
    }
  }
}

.account {
  background-color: white;
}
</style>


