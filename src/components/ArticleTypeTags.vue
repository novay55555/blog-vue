<template>
  <div class="article-type-tags form-group">
    <label for="">文章类型</label>
    <p 
      :class="inputShow ? 'active' : ''" 
      class="types-add">
      <input 
        v-model="value"
        type="text" 
        class="form-control" 
        placeholder="输入文章类型, 回车以保存" 
        @keyup.enter="addType">
      <a 
        href="#" 
        @click.prevent="toggleInputShow">新增类型</a>
    </p>
    <p>
      <span
        v-for="(item, index) in data"
        :key="index" 
        class="label">
        {{ item }}
        <a 
          href="#" 
          class="glyphicon glyphicon-remove"
          @click.prevent="deleteType(item)"/>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ArticleTypeTags',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: '',
      inputShow: false
    }
  },
  methods: {
    addType() {
      const { value, data } = this
      if (!value.trim()) {
        return this.$uiv_notify('文章类型不能为空')
      }

      if (data.indexOf(value) !== -1) {
        return this.$uiv_notify('重复的类型')
      }

      this.$emit('update:data', this.data.concat(value))
    },
    deleteType(name) {
      this.$emit('update:data', this.data.filter(el => el !== name))
    },
    toggleInputShow() {
      this.inputShow = !this.inputShow
    }
  }
}
</script>

<style lang="scss">
.article-type-tags {
  .types-add {
    position: relative;
    margin-bottom: 0;
    width: 64px;
    height: 34px;
    float: right;
    overflow: hidden;
    text-align: right;
    transition: width 0.25s ease-in-out;
    &.active {
      width: 269px;
    }
    & > a {
      display: inline-block;
      line-height: 34px;
    }
    & > input {
      position: absolute;
      top: 0;
      right: 69px;
      display: inline-block;
      max-width: 200px;
    }
  }
  .label {
    margin-right: 5px;
    font-size: 14px;
    color: #5bc0de;
    border: 1px solid #5bc0de;
    & > a {
      top: 0;
      margin-left: 5px;
      vertical-align: middle;
      color: #5bc0de;
      &:hover {
        color: #d9534f;
      }
    }
  }
}
</style>
