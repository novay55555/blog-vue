<template>
  <div class="article-form">
    <Input
      label="文章标题"
      placeholder="请输入文章标题"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '文章标题不能为空'
      }]"
      :current-value="title"
      @get-info="getTitleInfo"
    />
    <Input 
      label="作者"
      placeholder="请输入作者"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '作者不能为空'
      }]"
      :current-value="author"
      @get-info="getAuthorInfo"
    />
    <uiv-dropdown class="form-group">
      <label for="date">请选择时间</label>
      <div class="input-group">
        <div class="input-group-btn">
          <uiv-btn class="dropdown-toggle"><i class="glyphicon glyphicon-calendar"></i></uiv-btn>
        </div>
        <input class="form-control" type="text" v-model="date" readonly>
      </div>
      <template slot="dropdown">
        <li>
          <uiv-date-picker v-model="date"/>
        </li>
      </template>
    </uiv-dropdown>
    <Input 
      label="文章描述"
      placeholder="请输入文章描述"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '文章描述不能为空'
      }]"
      :current-value="description"
      @get-info="getDescriptionInfo"
    />
    <div class="form-group types">
      <label for="article-types">文章类型</label>
      <p>
        <button 
          v-for="(item, index) in articleTypes" 
          :key="index"
          class="btn"
          :class="articleType === item ? 'btn-primary' : 'btn-default'"
          @click="changeType(item)"
        >
          {{item}}
        </button>
      </p>
    </div>
    <Textarea 
      class-name='editor'
      label='文章内容'
      placeholder='Write something...'
      readonly="readonly"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '文章内容不能为空'
      }]"
      :current-value="content"
      @get-info="getContentInfo"
    />
    <div class="form-group">
      <button 
        class="btn btn-info" 
        :disabled="!canSubmit"
        @click="submit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import marked from 'marked'
import { formatDate, loadPlugin, querySelectors, each } from '../libs/utils.js'
import Input from './FormInput.vue'
import Textarea from './FormTextarea.vue'

export default {
  name: 'article-form',
  components: {
    Input,
    Textarea
  },
  props: {
    articleTypes: {
      type: Array,
      required: true
    },
    article: {
      type: Object,
      default: function() {
        return {}
      }
    },
    activeIndex: {
      type: Number,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    mode: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      id: '',
      title: '',
      titleErrMsg: '',
      author: '',
      authorErrMsg: '',
      description: '',
      descriptionErrMsg: '',
      content: '',
      contentErrMsg: '',
      date: formatDate(Date.now(), 'yyyy-MM-dd'),
      articleType: '',
      canSubmit: false,
      timer: null
    }
  },
  watch: {
    activeIndex(n) {
      if (n === this.currentIndex) {
        if (this.mode !== 'add') {
          const keys = [
            'title',
            'author',
            'description',
            'content',
            'date',
            'articleType'
          ]
          keys.forEach(key => {
            this[key] = this.article[key]
          })
          this.id = this.article._id
          this.canSubmit = true
          return
        }

        this.articleType = this.articleTypes[0]
        this.author = this.$store.state.account.username
      } else {
        this.reset()
      }
    }
  },
  mounted() {
    Promise.all([loadPlugin('markdownEditor'), loadPlugin('highlightjs')]).then(
      () => {
        $(this.$el)
          .find('.editor')
          .removeAttr('readonly')
          .attr('spellcheck', false)
          .markdown({
            onPreview: function(e) {
              // onPreview钩子是没插入到DOM的, hljs没办法高亮, 目前延迟解决该问题
              setTimeout(
                () =>
                  querySelectors('pre code').forEach(block =>
                    hljs.highlightBlock(block)
                  ),
                50
              )

              return marked(
                e.getContent() ||
                  'You should write something to preiview, right?'
              )
            }
          })
      }
    )
  },
  methods: {
    getTitleInfo(o) {
      this.title = o.value
      this.titleErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    getAuthorInfo(o) {
      this.author = o.value
      this.authorErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    getDescriptionInfo(o) {
      this.description = o.value
      this.descriptionErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    getContentInfo(o) {
      this.content = o.value
      this.contentErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    checkoutSubmit() {
      clearTimeout(this.timer)
      let cansubmit = true
      this.timer = setTimeout(() => {
        each(
          [this.title, this.author, this.description, this.content],
          value => {
            if (!value.trim()) {
              cansubmit = false
              return false
            }
          }
        )

        each(
          [
            this.titleErrMsg,
            this.authorErrMsg,
            this.descriptionErrMsg,
            this.contentErrMsg
          ],
          errMsg => {
            if (errMsg) {
              cansubmit = false
              return false
            }
          }
        )

        this.canSubmit = cansubmit
      }, 250)
    },
    submit() {
      let o = {}
      const keys = [
        'id',
        'title',
        'author',
        'date',
        'description',
        'articleType',
        'content'
      ]
      keys.forEach(key => {
        o[key] = this[key]
      })

      if (this.mode === 'add') delete o.id

      this.$emit('submit-article', o)
    },
    changeType(type) {
      this.articleType = type
    },
    reset() {
      // 重置为初始化数据
      // refer: https://github.com/vuejs/vue/issues/702
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style lang="scss">
.article-form {
  position: relative;
  .form-group {
    &:last-of-type {
      text-align: right;
    }
  }
  input.form-control[readonly] {
    background: #fff;
  }
  .types {
    button {
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }
  .md-editor {
    * {
      word-break: break-all;
      word-wrap: break-word;
    }
    pre {
      padding: 0;
      font-size: 14px;
    }
    img {
      margin: 10px auto;
      display: block;
      max-width: 100%;
    }
    ol {
      padding-left: 20px;
      list-style-type: decimal;
    }
    ul {
      padding-left: 20px;
      list-style-type: disc;
    }
    textarea {
      height: 400px;
    }
    & > textarea {
      padding: 6px 12px;
      background: #fff;
    }
  }
  .md-preview {
    padding: 6px 12px;
  }
  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.5);
    z-index: 10;
    &::after {
      content: 'Now loading...';
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 26px;
    }
  }
}
</style>
