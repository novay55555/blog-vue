<template>
  <uiv-modal
    v-model="value"
    title="登录"
    cancel-text="取消"
    ok-text="确定"
    size="sm">
    <InputGroup 
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '用户名不能为空'
      }]"
      :maxlength="12"
      :current-value="username"
      label="用户名"
      placeholder="请输入用户名"
      name="username"
      @get-info="getUsernameInfo"
      @on-enter="submit"/>
    <InputGroup
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
      @on-enter="submit"/>
    <InputCaptcha
      :current-value="captchaVal"
      @get-info="getCaptchaInfo"
      @on-enter="submit"
      @refresh="getCaptcha"/>
    <div 
      slot="footer">
      <uiv-btn 
        @click="value=false">取消</uiv-btn>
      <uiv-btn 
        :disabled="!canSubmit || isLoading"
        type="primary" 
        @click="submit">
        确定
      </uiv-btn>
    </div>
  </uiv-modal>
</template>

<script>
import Input from './FormInput.vue'
import InputCaptcha from './FormCaptcha.vue'
import { mixinModal } from '../libs/mixins.js'
import { each } from '../libs/utils.js'

export default {
  name: 'ModalSignin',
  components: {
    InputGroup: Input,
    InputCaptcha
  },
  mixins: [mixinModal],
  props: {
    captcha: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      username: '',
      password: '',
      captchaVal: '',
      usernameErrMsg: '',
      passwordErrMsg: '',
      captchaErrMsg: '',
      canSubmit: false
    }
  },
  watch: {
    visible(v) {
      this.value = v

      if (v && !this.captcha) {
        this.getCaptcha()
      }
    },
    value(v) {
      this.$emit('update:visible', v)
    }
  },
  methods: {
    getUsernameInfo(o) {
      this.username = o.value
      this.usernameErrMsg = o.errMsg
      this.checkSubmit()
    },
    getPasswordInfo(o) {
      this.password = o.value
      this.passwordErrMsg = o.errMsg
      this.checkSubmit()
    },
    getCaptchaInfo(o) {
      this.captchaVal = o.value
      this.captchaErrMsg = o.errMsg
      this.checkSubmit()
    },
    checkSubmit() {
      let canSubmit = true
      each([this.username, this.password, this.captchaVal], value => {
        if (!value.trim()) {
          canSubmit = false
          return false
        }
      })
      each(
        [this.usernameErrMsg, this.passwordErrMsg, this.captchaErrMsg],
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
        this.$emit('signin', this.username, this.password, this.captchaVal)
    },
    getCaptcha() {
      this.$emit('get-captcha', {
        width: 100,
        height: 34,
        fontSize: 40,
        color: '#fff',
        background: '#dddddd'
      })
    }
  }
}
</script>

<style>
</style>
