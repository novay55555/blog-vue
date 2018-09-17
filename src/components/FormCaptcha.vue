<template>
  <div :class="'form-input form-group form-captcha ' + status">
    <label 
      v-if="label"
      class="control-label" 
      :for="name"
    >
      {{errMsg || label}}
    </label>
    <div class="clearfix">
      <span 
        class="captcha" 
        v-html="captcha" 
        @click="refreshCaptcha"
        v-uiv-tooltip.top="'看不清点我'" 
      />
      <div class="inline-input">
        <input
          ref="input"
          class="form-control" 
          :type="type"
          :value="currentValue"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :minlength="minlength"
          @input="change($event)"
          @keyup.enter="enterKeyboard"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mixinInput } from '../libs/mixins.js'

export default {
  name: 'form-captcha',
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
  mixins: [mixinInput],
  computed: mapState('account', ['captcha']),
  methods: {
    ...mapActions('account', ['getCaptcha']),
    refreshCaptcha() {
      this.getCaptcha({
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
