<template>
  <div>
    <a-row>
      <!-- 左部水平菜单 -->
      <a-col :md="18" :xs="1" :sm="1">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="home">
            <router-link to="/home">
              <a-icon type="home"/>Home
            </router-link>
          </a-menu-item>
          <a-menu-item key="notification" @click="showNotification">
            <a-icon type="notification"/>通知
          </a-menu-item>
          <a-menu-item key="mail" @click="showChatModal">
            <a-badge :dot="showDot">
              <a-icon type="mail"/>私信
            </a-badge>
          </a-menu-item>
        </a-menu>
      </a-col>
      <!-- 左部水平菜单结束 -->
      <!-- 右部搜索框 + 圆形点击 -->
      <a-col :md="{offset: 0, span: 6}" :xs="{offset: 3, span: 20}" :sm="{offset: 3, span: 20}">
        <a-row :gutter="8">
          <!-- 搜索框 -->
          <a-col :sm="18" :xs="18">
            <a-input-search
              placeholder="search"
              style="width: 100%; border-radius: 24px"
              @search="onSearch"
            />
          </a-col>
          <!-- 搜索框结束 -->
          <!-- 头像 -->
          <a-col :sm="3" :xs="3">
            <a-popover
              trigger="hover"
              :visible="hovered"
              @visibleChange="handleHoverChange"
              placement="bottom"
            >
              <router-link
                :to="{name: 'person', params: {uname: $root.user.uname, userId: $root.user.userId}}"
                slot="title"
              >
                <h2>{{$root.user.unickname}}</h2>
                <p>@{{$root.user.uname}}</p>
              </router-link>
              <a slot="content">
                <a-button type="danger" block @click="handleLogout">
                  <a-icon type="poweroff"></a-icon>登出
                </a-button>
              </a>
              <a-popover
                trigger="click"
                :visible="clicked"
                @visibleChange="handleClickChange"
                placement="bottom"
              >
                <router-link
                  :to="{name: 'person', params: {uname: $root.user.uname, userId: $root.user.userId}}"
                  slot="title"
                >
                  <h2>{{$root.user.unickname}}</h2>
                  <p>@{{$root.user.uname}}</p>
                </router-link>
                <div slot="content">
                  <a-menu slot="overlay">
                    <a-menu-item key="0">
                      <router-link
                        :to="{name: 'person', params: {uname: $root.user.uname, userId: $root.user.userId}}"
                      >个人资料</router-link>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <router-link to="/settings/account">账户设置</router-link>
                    </a-menu-item>
                    <a-menu-divider/>
                    <a-menu-item key="3">
                      <p @click="handleLogout">登出 @{{$root.user.uname}}</p>
                    </a-menu-item>
                  </a-menu>
                </div>
                <a href @click.prevent>
                  <a-avatar
                    :src="$root.user.uAvatar"
                    class="avatar"
                  >{{$root.user.unickname.substring(0, 1).toUpperCase()}}</a-avatar>
                </a>
              </a-popover>
            </a-popover>
          </a-col>
          <!-- 头像结束 -->
          <!-- 发动态 -->
          <a-col :sm="3" :xs="0">
            <a href @click.prevent="showModal">
              <a-avatar icon="highlight" style="background-color: #1da1f2"></a-avatar>
            </a>
          </a-col>
          <!-- 发动态 -->
        </a-row>
      </a-col>
    </a-row>
    <!--发动态 modal-->
    <a-modal
      :bodyStyle="{padding: 0}"
      v-model="visible"
      title="发布新动态"
      :closable="closable"
      :footer="null"
    >
      <post-creator></post-creator>
    </a-modal>
    <!--私信 modal-->
    <a-modal
      :bodyStyle="{padding: 0}"
      :visible="chatModalVisable"
      title="私信"
      :footer="null"
      @cancel="handleCancel"
      :maskClosable="false"
    >
      <chat-modal></chat-modal>
    </a-modal>
    <!--通知 modal-->
    <a-modal
      :bodyStyle="{padding: 0}"
      :visible="notificationVisable"
      title="通知"
      :footer="null"
      @cancel="handleCancel"
      :maskClosable="true"
    >
      <notification></notification>
    </a-modal>
  </div>
</template>

<script>
import postCreator from './post/post-creator'
import chatModal from './chat/chat-modal'
import notification from './notification/notification'

export default {
  name: 'navMenu',
  props: ['currentKey'],
  components: {
    postCreator,
    chatModal,
    notification
  },
  data() {
    return {
      current: [this.currentKey],
      clicked: false,
      hovered: false,
      visible: false,
      closable: false,
      chatModalVisable: false,
      notificationVisable: false,
      showDot: false,
    }
  },
  methods: {
    onSearch(value) {
      this.$router.push({
        name: 'search',
        query: {
          search: value
        }
      })
    },
    hide() {
      this.clicked = false
      this.hovered = false
    },
    handleHoverChange(visible) {
      this.clicked = false
      this.hovered = visible
    },
    handleClickChange(visible) {
      this.clicked = visible
      this.hovered = false
    },
    handleSetAccount() {
      this.$router.push('/settings/account')
    },
    showModal() {
      this.visible = true
    },
    showChatModal() {
      this.chatModalVisable = true
      this.showDot = false
    },
    showNotification() {
      this.notificationVisable = true
    },
    showMsgChatModal(contactUser) {
      this.chatModalVisable = true
      this.showDot = false
      let flag = false
      this.$root.chatUsers.forEach((olduser) => {
        window.console.log(olduser)
        if (olduser.userId == contactUser.userId) {
          flag = true
        }
      })

      if (!flag) {
        this.$root.chatUsers.push(contactUser)
      }
    },
    handleCancel() {
      this.chatModalVisable = false
      this.notificationVisable = false
      this.current = [this.$route.name]
    },
    handleLogout() {
      this.axios.get(`loginOut?token=${this.$root.token}`)
        .then(res => {
          window.console.log(res)
          if (res.data.status === 200) {
            this.$root.clearStorage()
            this.$root.closeWebSocket()
            this.$router.push('/')
          }
        }, err => {
          window.console.log(err)
        })
    },
  },
  created() {
    this.$root.Bus.$on('emitChatModal', (userId, uname, unickname, uAvatar) => {
      let contactUser = {
        userId,
        uname,
        unickname,
        uAvatar,
        unread: false,
        msgs: []
      }
      this.showMsgChatModal(contactUser)
    })
    this.$root.Bus.$on('showDot', () => {
      this.showDot = true
    })
    this.$root.Bus.$on('unshowModal', () => {
      this.visible = false
    })
    this.$root.Bus.$on('logout', () => {
      this.handleLogout()
    })
  },
  beforeDestory() {
    this.$root.Bus.$off('showChatModal')
    this.$root.Bus.$off('showDot')
    this.$root.Bus.$off('unshowModal')
    this.$root.Bus.$off('logout')
  },
}
</script>

<style lang="" scoped>
</style>

<style>
.ant-menu-horizontal {
  line-height: 63px !important;
  border-bottom: none;
}
.ant-layout-header .ant-input {
  border-radius: 24px !important;
}
.post-creator-modal {
  padding: 0;
}
</style>
