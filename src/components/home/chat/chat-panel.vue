<template>
  <div style="height: 100%">
    <div class="chat-container">
      <ul v-chat-scroll="{always: true, smooth: true}">
        <li
          v-for="msg in newMsgs"
          :key="msg.index"
          :class="{'flexright': msg.userId === $root.user.userId, 'flex': true}"
        >
          <a-avatar
            class="chat-avatar avatar"
            :src="user.uAvatar"
          >{{ user.unickname.substring(0, 1).toUpperCase() }}</a-avatar>
          <span class="msg">{{msg.msg ? msg.msg : msg[0].msg}}</span>
        </li>
      </ul>
    </div>
    <a-row class="chat-creator">
      <a-col :span="24">
        <a-input-search style="border-radius: 24px;" @search="sendMsg" v-model="value">
          <a-icon slot="enterButton" type="arrow-up" class="send-btn"></a-icon>
        </a-input-search>
      </a-col>
      <a-col :span="4" :offset="1" class="comment-btns">
        <a @click.prevent @mousedown.prevent style="font-size: 14px">
          <a-icon type="smile" style="font-size: 16px" />表情
        </a>
      </a-col>
      <a-col :span="18" :offset="1" class="comment-btns">
        <a @click.prevent @mousedown.prevent style="font-size: 14px">
          <a-icon type="picture" style="font-size: 16px" />图片
        </a>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "chat-panel",
  props: ['user', 'msgs'],
  data() {
    return {
      value: null,
      newMsgs: this.msgs
    }
  },
  methods: {
    sendMsg(msg) {
      /*a-input-search 传入的参数就是输入的值*/
      this.newMsgs.push(
        {
          userId: this.$root.user.userId || 15,
          msg: msg
        }
      )
      let message = `${parseInt(this.user.userId)}!∮@∮!${parseInt(this.$root.user.userId)}!∮@∮!${msg}`
      this.value = ''
      this.$root.sendMessage(message)
    },
  },
  created() {

  }
}
</script>

<style scoped>
.chat-container {
  background-color: #e8e8e8;
  height: 90%;
}

ul {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: auto;
}

li {
  list-style: none;
  margin: 5px 0;
}

.chat-avatar {
  margin: 0 5px;
}

.msg {
  background-color: #ffffff;
  border-radius: 24px;
  padding: 5px 10px;
  max-width: 50%;
  height: auto;
}

.chat-creator {
  background-color: #e8f5fd;
  height: 10%;
}

.flexright {
  display: flex;
  flex-direction: row-reverse;
}
.flex {
  display: flex;
}
</style>

<style>
.chat-creator .ant-input {
  border-radius: 24px !important;
}

.chat-creator .ant-input-suffix .ant-input-search-button {
  border-radius: 24px;
  width: 30px;
  height: 30px;
  padding: 0;
  background-color: #1da1f2;
  margin-right: 1px;
}
</style>