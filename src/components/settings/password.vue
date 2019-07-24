<template>
  <div class="content">
    <h3>密码</h3>
    <div class="contentwrap">
      <password-form></password-form>
    </div>
  </div>
</template>

<script>
import passwordForm from './password-form.vue'

export default {
  name: "password",
  components: {
    passwordForm
  }
}
</script>

<style scoped>
</style>