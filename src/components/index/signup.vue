<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="E-mail">
        <a-input
          v-decorator="['uemail',{rules: [{type: 'email', message: '这不是个正确的邮箱哦',},
                {required: true, message: '请输入邮箱',}, {validator: handleEmail,}], validateTrigger: 'blur'}]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码">
        <a-input
          v-decorator="['upassword',{rules: [{required: true, message: '请输入密码',},
                {validator: validateToNextPassword,}],validateTrigger: 'blur',}]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认密码">
        <a-input
          v-decorator="['confirm',{rules: [{required: true, message: '请输入确认密码',},
                {validator: compareToFirstPassword,},], validateTrigger: 'blur'},]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          用户名&nbsp;
          <a-tooltip title="您的用户名，用作登录">
            <a-icon type="question-circle-o"/>
          </a-tooltip>
        </span>
        <a-input
          v-decorator="['uname',{rules: [{ required: true, message: '请输入用户名', whitespace: true },
                {validator: handleUname}], validateTrigger: 'blur'}]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          昵称&nbsp;
          <a-tooltip title="想别人如何称呼您?">
            <a-icon type="question-circle-o"/>
          </a-tooltip>
        </span>
        <a-input
          v-decorator="['unickname',{rules: [{ required: true, message: '请输入昵称', whitespace: true }]}]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="手机号">
        <a-input
          v-decorator="['uphone',{rules: [{ required: true, message: '请输入手机' }, { min: 11, message: '这不是正确的手机号哦~' },
                 {validator:handlePhone}],validateTrigger: 'blur'}]"
          style="width: 100%"
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
        <a-checkbox
          v-decorator="['agreement', {valuePropName: 'checked', initialValue: true,},
                { rules: [{ required: true, message: '您必须同意我们的用户协议才能注册！' }] }]"
        >
          我已同意
          <a href>用户协议</a>
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" :loading="loading" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      loading: false,
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
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
            offset: 8,
          },
        },
      },
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true
          window.console.log('Received values of form: ', JSON.stringify(values));
          values.upassword = this.$md5(values.upassword)
          window.console.log('md5:', values.upassword)
          this.axios({
            url: '/register/register',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            data: this.$qs.stringify(values)
          })
            .then(res => {
              this.loading = false
              window.console.log(res)
              if (res.data.status === 200) {
                this.$message.success(res.data.msg)
                this.$root.Bus.$emit('success')
              } else {
                this.$message.warning('网络繁忙，请稍后再试')
              }
            }, error => {
              window.console.log(error)
              setTimeout(() => {
                this.loading = false
                this.$message.error('网络似乎不通哦~')
              }, 1500)
            })
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    handleEmail(rule, value, callback) {
      if (value) {
        validate(value, this, callback, 'uemail')
      } else {
        callback()
      }
    },
    handleUname(rule, value, callback) {
      if (value) {
        validate(value, this, callback, 'uname')
      } else {
        callback()
      }
    },
    handlePhone(rule, value, callback) {
      if (value) {
        validate(value, this, callback, 'uphone')
      } else {
        callback()
      }
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
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
}

function validate(value, that, callback, type) {
  that.axios.get(`register/check/${value}/${type}`, value)
    .then(res => {
      window.console.log(res)
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
</script>

<style lang="" scoped>
</style>