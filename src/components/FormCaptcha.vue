<template>
  <div :class="'form-input form-group form-captcha ' + status">
    <label 
      v-if="label"
      :for="name" 
      class="control-label"
    >
      {{ errMsg || label }}
    </label>
    <div class="clearfix">
      <span 
        v-uiv-tooltip.top="'看不清点我'" 
        class="captcha" 
        @click="refreshCaptcha"
        v-html="captcha" 
      />
      <div class="inline-input">
        <input
          ref="input"
          :type="type" 
          :value="currentValue"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :minlength="minlength"
          class="form-control"
          @input="change($event)"
          @keyup.enter="enterKeyboard"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mixinInput } from '../libs/mixins.js'

export default {
  name: 'FormCaptcha',
  mixins: [mixinInput],
  props: {
    label: {
      type: String,
      default: '验证码'
    },
    validates: {
      type: Array,
      default: function() {
        return [
          {
            rule: 'isNotEmpty',
            errMsg: '验证码不能为空'
          }
        ]
      }
    },
    placeholder: {
      type: String,
      default: '请输入验证码'
    }
  },
  computed: mapState('account', ['captcha']),
  methods: {
    ...mapActions('account', ['getCaptcha']),
    refreshCaptcha() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss">
.form-captcha {
  .captcha {
    float: right;
    cursor: pointer;
  }
  .inline-input {
    margin-right: 115px;
  }
}
</style>
