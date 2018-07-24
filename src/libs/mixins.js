import { mapState } from 'vuex'

export const mixinModal = {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      value: false
    }
  },
  created() {
    this.value = this.visible
  },
  watch: {
    visible(v) {
      this.value = v
    },
    value(v) {
      this.$emit('update:visible', v)
    }
  }
}

export const mixinArticle = {
  computed: mapState('articles', {
    articles: state => state.items,
    currentPage: state => state.page,
    total: state => state.total
  })
}

export const mixinInput = {
  props: {
    name: String,
    label: String,
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
      errMsg: '',
      rules: {
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
          return this.rules[validateRule].apply(input, args)
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
