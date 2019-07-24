<template>
  <div>
    <div class="card-container">
      <user-card show-btns="true" v-for="user in users" :key="user.userId" :user="user"></user-card>
    </div>
    <div v-if="users.length === 0">
      <p class="tips">暂时没有用户哦</p>
    </div>
  </div>
</template>

<script>
import userCard from './user-card'
export default {
  name: "user-card-list",
  props: ['url'],
  components: {
    userCard
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    getUsers() {
      this.axios.get(this.url)
        .then(res => {
          this.users = res.data.data
        }, err => {
          window.console.log(err)
        })
    }
  },
  created() {
    this.getUsers()
  },
  watch: {
    url() {
      this.getUsers()
    }
  }
}
</script>

<style scoped>
.card-container {
  margin-top: 15px;
}
.card-container > * {
  display: inline-block;
  margin-right: 15px;
  width: 45%;
}
.tips {
  text-align: center;
  margin-top: 10px;
  color: grey;
}
</style>