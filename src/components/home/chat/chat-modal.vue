<template>
  <div class="chat-modal">
    <a-tabs
      defaultActiveKey="1"
      tabPosition="left"
      :style="{ height: '567px'}"
      v-if="users.length"
      @edit="onEdit"
      size="small"
    >
      <a-tab-pane v-for="user in users" :key="user.userId">
        <div slot="tab" @click="user.unread = false">
          <a-badge :dot="user.unread">
            <a-avatar
              class="user-avatar avatar"
              :src="user.uAvatar"
            >{{user.unickname.substring(0, 1).toUpperCase()}}</a-avatar>
            {{user.uname}}
          </a-badge>
        </div>
        <chat-panel :user="user" :msgs="user.msgs"></chat-panel>
      </a-tab-pane>
    </a-tabs>
    <div v-else>
      <div class="tips">
        <p>暂时还没有消息哦</p>
      </div>
    </div>
  </div>
</template>

<script>
import chatPanel from './chat-panel'

export default {
  name: "chatModal",
  components: {
    chatPanel,
  },
  data() {
    return {
      users: this.$root.chatUsers,
      activeKey: 15
    }
  },
  methods: {
    onEdit(targetKey, action) {
      window.console.log(targetKey, action)
      this[action](targetKey)
    },
  },
  created() {

  },
  beforeDestory() {

  }
}
</script>

<style scoped>
.user-avatar {
  margin-right: 5px;
}
.tips {
  width: 500px;
  height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="less">
.chat-modal {
  .ant-tabs-content {
    padding: 0;
    height: 100%;

    .ant-tabs-tabpane {
      height: 100%;
    }
  }
}
.ant-tabs-tab > div {
  text-align: left;
}
</style>