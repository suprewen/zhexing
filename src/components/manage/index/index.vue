<template>
  <div>
    <router-link :to="{name: 'login'}">
      <span class="tologin">登录</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="less">
.tologin {
  width: 200px;
  display: block;
  margin: 15px auto;
  text-align: center;
  border-radius: 24px;
  transition: all 0.5s;
  background-color: @primary-color;
  color: #fff;
}

.tologin:hover {
  background-color: #1d8ad6;
  box-shadow: 0 0 1px 1px #1da1f2;
}

a {
  text-decoration: none;
}
</style>