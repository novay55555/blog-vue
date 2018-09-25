<template>
  <uiv-modal
    v-model="value"
    title="注册"
    cancel-text="取消"
    ok-text="确定"
    size="sm"
  >
    <Input 
      :current-value="username"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '用户名不能为空'
      }]"
      :maxlength="12"
      label="用户名"
      placeholder="请输入用户名"
      name="username"
      @get-info="getUsernameInfo"
      @on-enter="submit"
    >
    <Input
      :current-value="password"
      :validates="[
        {
          rule: 'isNotEmpty',
          errMsg: '密码不能为空'
        }, 
        {
          rule: 'minLength:6',
          errMsg: '密码长度不少于6个'
        }
      ]"
      :maxlength="16"
      label="密码"
      name="password"
      type="password"
      placeholder="请输入密码"
      @get-info="getPasswordInfo"
      @on-enter="submit"
    >
    <Input
      :current-value="email"
      :validates="[
        {
          rule: 'isNotEmpty',
          errMsg: '邮箱不能为空'
        }, 
        {
          rule: 'isEmail',
          errMsg: '请输入正确的邮箱'
        }
      ]"
      :maxlength="16"
      label="邮箱"
      name="email"
      placeholder="请输入邮箱"
      @get-info="getEmailInfo"
      @on-enter="submit"
    >
    <InputCaptcha
      :current-value="captchaVal"
      @get-info="getCaptchaInfo"
      @on-enter="submit"
    />
    <div slot="footer">
      <uiv-btn @click="value=false">取消</uiv-btn>
      <uiv-btn 
        :disabled="!canSubmit || isLoading"
        type="primary" 
        @click="submit"
      >
        确定
      </uiv-btn>
    </div>
  </uiv-modal>
</template>

<script>
import SigninModal from './ModalSignin.vue'
import { each } from '../libs/utils.js'

export default {
  name: 'ModalSignup',
  extends: SigninModal,
  data() {
    return {
      email: '',
      emailErrMsg: ''
    }
  },
  methods: {
    getEmailInfo(o) {
      this.email = o.value
      this.emailErrMsg = o.errMsg
      this.checkSubmit()
    },
    checkSubmit() {
      let canSubmit = true
      each(
        [this.username, this.password, this.email, this.captchaVal],
        value => {
          if (!value.trim()) {
            canSubmit = false
            return false
          }
        }
      )
      each(
        [
          this.usernameErrMsg,
          this.passwordMsg,
          this.emailErrMsg,
          this.captchaErrMsg
        ],
        errMsg => {
          if (errMsg) {
            canSubmit = false
            return false
          }
        }
      )
      this.canSubmit = canSubmit
    },
    submit() {
      this.canSubmit &&
        this.$emit(
          'signup',
          this.username,
          this.password,
          this.email,
          this.captchaVal
        )
    }
  }
}
</script>

<style>
</style>
