<template>
  <uiv-modal
    v-model="value"
    title="修改用户"
    cancel-text="取消"
    ok-text="确定"
    size="sm"
  >
    <Input
      :current-value="password"
      :validates="[
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
    >
    <div slot="footer">
      <uiv-btn @click="value=false">取消</uiv-btn>
      <uiv-btn 
        :disabled="!canSubmit"
        type="primary" 
        @click="submit"
      >
        确定
      </uiv-btn>
    </div>
  </uiv-modal>
</template>

<script>
import { mixinModal } from '../libs/mixins.js'
import { each } from '../libs/utils.js'
import Input from './FormInput.vue'

export default {
  name: 'UserModal',
  components: {
    Input
  },
  mixins: [mixinModal],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      password: '',
      passwordErrMsg: '',
      email: '',
      emailErrMsg: '',
      canSubmit: false
    }
  },
  watch: {
    value(n) {
      if (n === true) {
        this.email = this.data.email
        this.password = ''
      }

      this.$emit('update:visible', n)
    }
  },
  methods: {
    getPasswordInfo(o) {
      this.password = o.value
      this.passwordErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    getEmailInfo(o) {
      this.email = o.value
      this.emailErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    checkoutSubmit() {
      let canSubmit = true

      each([this.password, this.email], value => {
        if (!value.trim()) {
          canSubmit = false
          return false
        }
      })

      each([this.passwordErrMsg, this.emailErrMsg], errMsg => {
        if (errMsg) {
          canSubmit = false
          return false
        }
      })

      this.canSubmit = canSubmit
    },
    submit() {
      this.$emit('on-submit', this.data._id, this.password, this.email)
    }
  }
}
</script>

<style>
</style>
