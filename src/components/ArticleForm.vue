<template>
  <div class="article-form">
    <Input
      label="文章标题"
      placeholder="请输入文章标题"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '文章标题不能为空'
      }]"
      :value="title"
    />
    <Input 
      label="作者"
      placeholder="请输入作者"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '作者不能为空'
      }]"
      :value="author"
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
        errMsg: '时间不能为空'
      }]"
      :value="description"
    />
    <div class="form-group types">
      <label for="article-types">文章类型</label>
      <p>
        <button 
          v-for="(item, index) in articleTypes" 
          :key="index"
          class="btn"
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
    />
    <div class="form-group">
      <button class="btn btn-info">Submit</button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { formatDate, loadPlugin } from '../libs/utils.js'
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
    article: Object
  },
  mounted() {
    loadPlugin('markdownEditor').then(() => {
      $(this.$el).find
    })
  },
  data() {
    return {
      title: '',
      author: '',
      description: '',
      date: formatDate(Date.now(), 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="scss">
.article-form {
  position: relative;
  textarea {
    height: 400px;
  }
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
