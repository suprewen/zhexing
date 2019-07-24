<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="E-mail" has-feedback>
        <a-input
          v-decorator="['uemail',{rules: [{type: 'email', message: '这不是个正确的邮箱哦',},{validator: handleUemail,}], validateTrigger: 'blur'}]"
          @change="setSubmitBtn"
          maxlength="40"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" has-feedback>
        <span slot="label">
          用户名&nbsp;
          <a-tooltip title="您的用户名，用作登录">
            <a-icon type="question-circle-o"/>
          </a-tooltip>
        </span>
        <a-input
          v-decorator="['unewname',{rules: [{whitespace: true, message: '请输入新用户名' },{validator: handleUnewname}], validateTrigger: 'blur'}]"
          @change="setSubmitBtn"
          maxlength="40"
        />
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="['uname']" style="display: none"></a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          昵称&nbsp;
          <a-tooltip title="想别人如何称呼您?">
            <a-icon type="question-circle-o"/>
          </a-tooltip>
        </span>
        <a-input
          v-decorator="['unickname', {rules: [{whitespace: true, message: '请输入昵称'}]}]"
          maxlength="40"
          @change="setSubmitBtn"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="手机号" has-feedback>
        <a-input
          v-decorator="['uphone',{rules: [{ len: 11, message: '这不是正确的手机号哦~' },{validator: handleUphone}],validateTrigger: 'blur'}]"
          style="width: 100%"
          @change="setSubmitBtn"
          maxlength="11"
        >
          <a-select
            slot="addonBefore"
            v-decorator="['prefix',{ initialValue: '86' }]"
            style="width: 70px"
          >
            <a-select-option value="86">+86</a-select-option>
            <a-select-option value="87">+87</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>

      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          :loading="loading"
          :disabled="submitDisable"
          html-type="submit"
        >保存修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function validate(value, that, callback, type) {
  that.axios.get(`register/check/${value}/${type}`, value)
    .then(res => {
      if (res.data.data === false) {
        callback('这个已经被占用了哦~')
      } else {
        callback()
      }
    }, error => {
      window.console.log(error)
      callback()
      that.$message.warning('网络繁忙，请稍后再试！')
    })
}

export default {
  name: "acount-form",
  data() {
    return {
      user: this.$root.user,
      loading: false,
      confirmDirty: false,
      submitDisable: true,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
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
            offset: 10,
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
          values.token = this.$root.token
          values.user_id = this.$root.user.userId
          this.axios({
            url: '/UpdateUserMessage',
            method: 'get',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            params: values,
            paramsSerializer: params => this.$qs.stringify(params),
          })
            .then(res => {
              this.loading = false
              if (res.data.status === 200) {
                this.$message.success('修改成功')
                this.$root.setUser(values)
              } else if (res.data.status === 220) {
                this.$message.success(res.data.msg)
                this.$root.Bus.$emit('logout')
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
    handleUnewname(rule, value, callback) {
      if (value && value !== this.$root.user.uname) {
        validate(value, this, callback, 'unewname')
      } else {
        callback()
      }
    },
    handleUemail(rule, value, callback) {
      if (value && value !== this.$root.user.uemail) {
        validate(value, this, callback, 'uemail')
      } else {
        callback()
      }
    },
    handleUphone(rule, value, callback) {
      if (value && value !== this.$root.user.uphone) {
        validate(value, this, callback, 'uphone')
      } else {
        callback()
      }
    },
    setSubmitBtn() {
      this.submitDisable = ((this.form.getFieldValue('unewname') === this.user.uname) && (this.form.getFieldValue('uemail') === this.user.uemail) &&
        (this.form.getFieldValue('uphone') === this.user.uphone) && (this.form.getFieldValue('unickname') === this.user.unickname))
    },
    checkUemail() {
      this.submitDisable = (this.form.getFieldValue('uemail') === this.user.uemail)
    },
    checkUphone() {
      this.submitDisable = (this.form.getFieldValue('uphone') === this.user.uphone)
    },
    checkUnickname() {
      this.submitDisable = (this.form.getFieldValue('unickname') === this.user.unickname)
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
  },
  created() {

  },
  mounted() {
    this.form.setFieldsValue({
      'uemail': this.user.uemail,
      'unewname': this.user.uname,
      'uname': this.user.uname,
      'unickname': this.user.unickname,
      'uphone': this.user.uphone
    })
    this.submitDisable = true
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