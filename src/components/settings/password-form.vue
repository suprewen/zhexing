<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="旧密码">
        <a-input
          v-decorator="['uoldpassword',{rules: [],validateTrigger: 'blur',}]"
          type="password"
        />
        <a href @click.prevent="forgetPassword()">忘记密码</a>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="新密码">
        <a-input
          v-decorator="['upassword',{rules: [
                {validator: validateToNextPassword,}],validateTrigger: 'blur',}]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认密码">
        <a-input
          v-decorator="['confirm',{rules: [
                {validator: compareToFirstPassword,},], validateTrigger: 'blur'},]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>

      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" :loading="loading" html-type="submit">保存修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "password-form",
  data() {
    return {
      loading: false,
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 16 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 8 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true
          values.uoldpassword = this.$md5(values.uoldpassword)
          values.upassword = this.$md5(values.upassword)
          this.axios({
            url: '',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            data: this.$qs.stringify(values)
          })
            .then(res => {
              this.loading = false
              if (res.data.status === 200) {
                this.$message.success(res.data.msg)
                this.$root.Bus.$emit('success')
              } else {
                this.$message.warning('网络繁忙，请稍后再试')
              }
            }, error => {
              window.console.log(error)
              this.loading = false
              this.$message.error('网络似乎不通哦~')
            })
        }
      });
    },
    forgetPassword() {
      this.$message.info('不准忘记密码！')
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('upassword')) {
        callback('两次输入的密码不一样！');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
  created() {

  },
  beforeDestory() {

  }
}
</script>

<style scoped>
.container {
  font-family: "Segoe UI", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  font-weight: bold;
}

a {
  text-decoration: none;
}

.myIcon {
  font-size: 18px;
}
</style>