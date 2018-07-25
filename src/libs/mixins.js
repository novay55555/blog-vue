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

export const mixinArticle = Object.assign(
  {
    computed: mapState('articles', {
      articles: state => state.items,
      currentPage: state => state.page,
      total: state => state.total
    })
  },
  getTitleMixin(VUE_RUNTIME)
)

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
    currentValue: {
      type: String,
      required: true
    },
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
      const value = e.target.value
      this.validator.start && this.validator.start(value)
      this.$emit('get-info', {
        value,
        errMsg: this.errMsg
      })
    }
  }
}

export const titleMixin = getTitleMixin(VUE_RUNTIME)

function getTitle(vm) {
  const { title = '艾酱的理想鄉' } = vm.$options

  return typeof title === 'function' ? title.call(vm) : title
}

function getTitleMixin(runtime) {
  const mixin = {
    client: {
      created() {
        const title = getTitle(this)

        document.title = title
      }
    },
    server: {
      created() {
        const title = getTitle(this)

        this.$ssrContext.title = title
      }
    }
  }

  return mixin[runtime]
}
