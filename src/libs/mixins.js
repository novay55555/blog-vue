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
