<template>
  <div :class="'form-input form-group ' + status">
    <label 
      v-if="label"
      class="control-label" 
      :for="name"
    >
      {{errMsg || label}}
    </label>
    <input
      ref="input"
      class="form-control" 
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      @input="change($event)"
    />
  </div>
</template>

<script>
const RULES = {
  isNotEmpty: (value, errMsg) => {
    if (value.trim() === '') return errMsg
  },
  minLength: (value, length, errMsg) => {
    if (value.length < length) return errMsg
  },
  maxLength: (value, length, errMsg) => {
    if (value.length > length) return errMsg
  },
  isEmail: (value, errMsg) => {
    if (
      !/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
        value
      )
    )
      return errMsg
  }
}

export default {
  name: 'form-input',
  props: {
    name: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    validates: {
      type: Array
    },
    onReset: Function,
    maxlength: Number,
    minlength: Number
  },
  data() {
    return {
      validator: {},
      value: '',
      status: '',
      errMsg: ''
    }
  },
  mounted() {
    if (this.validates) {
      this.validator = this.initValidator(this.validates)
    }
  },
  methods: {
    initValidator(validates) {
      let _cache = []
      let validator = {}
      validates.forEach(validate => {
        _cache.push(() => {
          let input = this.$refs.input
          let args = validate.rule.split(':')
          let validateRule = args.shift()
          args.push(validate.errMsg)
          args.unshift(input.value)
          return RULES[validateRule].apply(input, args)
        })
      })
      validator.start = () => {
        for (let i = 0; i < _cache.length; i++) {
          const validateFn = _cache[i]
          const errMsg = validateFn()

          if (errMsg) {
            this.status = 'has-error'
            this.errMsg = errMsg
            return false
          }

          this.status = ''
          this.errMsg = ''
        }
        return true
      }
      return validator
    },
    change(e) {
      this.value = e.target.value
      this.validator.start && this.validator.start(this.value)
      this.$emit('get-info', {
        value: this.value,
        errMsg: this.errMsg
      })
    }
  }
}
</script>

<style>
</style>
