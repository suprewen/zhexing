import Vue from 'vue'

import './thirdParty.js'

import App from './App.vue'
import router from './pages/zhexing/router'

Vue.config.productionTip = false

let websocket = null
!('WebSocket' in window) &&
  window.alert('当前浏览器不支持WebSocket, 可能会影响您的私信体验哦')

new Vue({
  render: h => h(App),
  router,
  data: {
    Bus: new Vue(),
    logined: false,
    token: '',
    user: {
      userId: '',
      uname: '',
      unickname: '',
      uphone: '',
      uAvatar: '',
      uCover: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg'
    },
    // TODO
    chatUsers: []
  },
  methods: {
    beforeunloadHandler() {
      this.axios.get(`loginOut?token=${this.token}`).then(
        res => {
          window.console.log(res)
        },
        err => {
          window.console.log(err)
        }
      )
      this.closeWebSocket()
    },
    setUser(data) {
      this.logined = true
      this.token = data.token
      // TODO 用结构赋值简化下面代码
      this.user.userId = data.user_id
      this.user.uemail = data.uemail
      this.user.unickname = data.unickname
      this.user.uphone = data.uphone
      this.user.uname = data.uname
      this.user.uAvatar = data.uchathead

      let storage = window.localStorage
      let userInfo = JSON.stringify(this.user)
      storage.setItem('userInfo', userInfo)
      storage.setItem('token', data.token)
      storage.setItem('logined', this.logined)
    },
    setChangedUser(user) {
      this.user = user
      let storage = window.localStorage
      let userInfo = JSON.stringify(this.user)
      storage.setItem('userInfo', userInfo)
    },
    resetUser() {
      let s = window.localStorage
      this.user = JSON.parse(s.getItem('userInfo'))
      this.token = s.getItem('token')
      this.logined = s.getItem('logined')
    },
    clearStorage() {
      this.logined = false
      let s = window.localStorage
      s.removeItem('token')
      s.removeItem('logined')
      s.removeItem('userInfo')
    },
    getIp() {
      return new Promise(resolve => {
        this.axios.get('websocket/getip').then(
          res => {
            resolve(res.data.data)
          },
          err => {
            window.console.log(err)
          }
        )
      })
    },
    connectWebSocket() {
      this.getIp().then(res => {
        this.handleWebSocket(res)
      })
    },
    handleWebSocket(data) {
      websocket = new WebSocket(
        `ws://${data}/websocket/${this.user.userId}/${this.user.uname}/${
          this.user.unickname
        }/1`
      ) /*${encodeURIComponent(this.user.uAvatar)}*/

      websocket.onopen = () => {
        window.console.log('websocket connected')
      }
      websocket.onclose = () => {
        window.console.log('websocket closed')
      }
      websocket.onerror = () => {
        window.console.log('websocket connect error')
        //this.connectWebSocket()
      }

      websocket.onmessage = evt => {
        window.console.log(evt.data)
        let wsMsg = evt.data.split('!∮@∮!')
        let userInfo = JSON.parse(wsMsg[4])
        let contactUser = {
          userId: userInfo.userId,
          uname: userInfo.uname,
          unickname: userInfo.unickname,
          uAvatar: userInfo.uchathead,
          unread: true,
          msgs: [
            {
              userId: wsMsg[1],
              msg: wsMsg[2]
            }
          ]
        }
        this.appendMsg(contactUser)
        this.$root.Bus.$emit('showDot')
      }
    },
    appendMsg(user) {
      let flag = false
      this.chatUsers.forEach(olduser => {
        window.console.log(olduser)
        if (olduser.userId == user.userId) {
          flag = true
          olduser.msgs.push(user.msgs)
          window.console.log(this.chatUsers)
        }
      })

      if (!flag) {
        this.chatUsers.push(user)
      }
    },
    sendMessage(msg) {
      websocket.send(msg)
    },
    closeWebSocket() {
      if (websocket) websocket.close()
    }
  },
  created() {
    this.Bus.$on('setUser', data => {
      this.setUser(data)
    })
    if (window.localStorage.getItem('token')) {
      this.resetUser()
    }
    if (this.user.userId) {
      this.connectWebSocket()
    }
  },
  mounted() {
    window.addEventListener('beforeunload', () => this.beforeunloadHandler())
  },
  beforeDestoryed() {
    window.removeEventListener('beforeunload', () => this.beforeunloadHandler())
    this.Bus.$off('setUser')
  }
}).$mount('#app')
