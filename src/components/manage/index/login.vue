<template>
  <div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item :validate-status="validatePassword">
        <a-tooltip
          placement="top"
          :visible="tooltiped"
          @focus="tooltiped = false; validatePassword='success'"
        >
          <template slot="title">
            <span>账号或密码错误</span>
          </template>
          <a-input
            maxlength="45"
            v-decorator="['uname',{rules: [{ required: true, message: '请输入用户名' }]}]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-tooltip>
      </a-form-item>

      <a-form-item>
        <a-input
          maxlength="20"
          v-decorator="['upassword',{rules: [{ required: true, message: '请输入密码' },
                 { min : 6, message: '密码长度至少6位！' },], validateTrigger: 'blur'}]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true,}]">记住我</a-checkbox>
        <a class="login-form-forgot" href @click.prevent="forgetPassword()">忘记密码</a>
        <a-button
          icon="login"
          :loading="loading"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >登录</a-button>
        <a @click.prevent>
          <span style="visibility: hidden">没有账号？去注册</span>
        </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  name: "login",
  data() {
    return {
      loading: false,
      tooltiped: false,
      validatePassword: '',
      hasErrors,
    };
  },
  methods: {
    forgetPassword() {
      this.$message.info('不准忘记密码！')
    },
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },
    // Only show error after a field is touched.
    passwordError() {
      this.tooltiped = true
      this.validatePassword = 'error'
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        if (!err) {
          this.loading = true
          //values.upassword = this.$md5(values.upassword)
          /*this.axios({
            url: 'login',/!*http://192.168.2.116:8888/!*!/
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            timeout: 7000,
            data: this.$qs.stringify(values)
          })
            .then(res => {
              this.loading = false
              window.console.log(res)
              if (res.data.status === 200) {
                this.$message.success('ok')
                this.$root.Bus.$emit('setToken', JSON.parse(res.data.data))
                this.$root.Bus.$emit('setUser', JSON.parse(res.data.data))
                this.$root.connectWebSocket()
                this.$router.push('/home')
              } else if (res.data.status === 500 || res.data.status === 418) {
                this.$message.warning('网络繁忙，请稍后再试')
              } else if (res.data.status === 400) {
                this.$message.warning(res.data.msg)
              } else if (res.data.status === 405) {
                this.passwordError()
              }
            }, error => {
              this.loading = false
              window.console.log(error)
              this.$message.error('网络似乎不通哦')
            })*/
          setTimeout(() => {
            this.loading = false
            this.$router.push({ name: 'magehome' })
          }, 1000)
        }
      });
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
}
</script>

<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>