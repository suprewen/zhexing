<template>
  <div class="code-container">
    <pre>
      <a :href="url" target="_blank" class="link">更新配置</a>
    <code>
      {{data[keyNum]}}
    </code>
    </pre>
  </div>
</template>

<script>
export default {
  name: "source-property",
  props: ['data', 'keyNum'],
  data() {
    return {

    }
  },
  computed: {
    url() {
      return this.data[this.keyNum].name.replace('.git', '/blob/master')
    }
  }
}
</script>

<style scoped>
.code-container {
  overflow: auto;
  height: 100%;
  width: 100%;
}
.link {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
}
</style>