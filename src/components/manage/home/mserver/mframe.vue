<template>
  <iframe referrerpolicy="no-referrer" height="100%" width="100%" :src="src"></iframe>
</template>

<script>
export default {
  name: "mframe",
  props: ['src'],
  data() {
    return {

    }
  },
  methods: {

  },
  watch: {
    src() {
      window.console.log(this.src)
    }
  }
}
</script>

<style scoped>
iframe {
  border: 0;
}
</style>