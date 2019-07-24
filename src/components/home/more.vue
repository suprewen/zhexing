<template>
  <div class="version">
    <span>&copy;&nbsp;zhexing&nbsp;</span>
    <span v-if="version">Version {{ version }}</span>
  </div>
</template>

<script>
export default {
  name: 'more',
  data() {
    return {
      version: '',
    }
  },
  methods: {
    getVersion() {
      this.axios.get(`getVersion`)
        .then(res => {
          this.version = res.data
        })
    }
  },
  created() {
    this.getVersion()
  }
}
</script>

<style lang="css" scoped>
.version {
  background-color: #ffffff;
  margin-top: 10px;
  padding: 15px;
  font-size: 12px;
  color: #657786;
  font-weight: normal;
}
</style>