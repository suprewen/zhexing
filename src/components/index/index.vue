<template>
  <div>
    <router-link :to="{name: 'login'}">
      <span class="tologin">登录</span>
    </router-link>
    <a href @click.prevent="showModal">
      <span class="tosignup">注册</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {

    }
  },
  methods: {
    showModal() {
      this.$emit('showModal')
    }
  }
}
</script>

<style lang="less" scoped>
.tologin,
.tosignup {
  width: 200px;
  display: block;
  margin: 15px auto;
  text-align: center;
  border-radius: 24px;
  transition: all 0.5s;
}

.tologin {
  background-color: @primary-color;
  color: #fff;
}

.tosignup {
  border: 1px solid #2c3e50;
}

.tologin:hover {
  background-color: #1d8ad6;
  box-shadow: 0 0 1px 1px #1da1f2;
}

.tosignup:hover {
  box-shadow: 0 0 1px 1px #2c3e50;
}

a {
  text-decoration: none;
}
</style>