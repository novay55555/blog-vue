<template>
  <Layout class="inside-admin">
    <div class="photo">
      <img 
        :src="photoUrl" 
        alt=""
      >
    </div>
    <div class="form-group">
      <label for="">管理员头像</label>
      <input 
        v-model="photoUrl" 
        type="text" 
        class="form-control" 
        placeholder="请输入头像链接"
      >
    </div>
    <Input 
      :current-value="name"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '管理员帐号不能为空'
      }]"
      label="管理员帐号"
      placeholder="请输入管理员帐号"
      @get-info="getAccountInfo"
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
      label="管理员密码"
      placeholder="请输入管理员密码"
      @get-info="getPasswordInfo"
    >
    <Input 
      :current-value="email"
      :validates="[
        {
          rule: 'isNotEmpty',
          errMsg: '管理员邮箱不能为空'
        },
        {
          rule: 'isEmail',
          errMsg: '邮箱格式不正确'
        }
      ]"
      label="管理员邮箱"
      placeholder="请输入管理员邮箱"
      @get-info="getEmailInfo"
    >
    <Input 
      :current-value="job"
      label="职业"
      placeholder="输入职业则会显示在首页"
      @get-info="getJobInfo"
    >
    <Input 
      :current-value="intro"
      label="简介"
      placeholder="输入简介则会显示在首页"
      @get-info="getIntroInfo"
    >
    <ArticleTypes :data.sync="articleTypes" />
    <div class="form-group">
      <button 
        :disabled="!canSubmit" 
        class="btn btn-info" 
        @click="renewBlog"
      >Submit</button>
    </div>
  </Layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mixinSeo } from '../libs/mixins.js'
import { each, asyncHandler } from '../libs/utils.js'
import Layout from '../layouts/Inside.vue'
import Input from '../components/FormInput.vue'
import Upload from '../components/UploadAvatar.vue'
import ArticleTypes from '../components/ArticleTypeTags.vue'

export default {
  name: 'InsideAdmin',
  components: {
    Layout,
    Input,
    Upload,
    ArticleTypes
  },
  asyncData({ store, ctx }) {
    return store.dispatch(
      'account/getFullAdmin',
      ctx ? { headers: ctx.headers } : {}
    )
  },
  mixins: [mixinSeo],
  data() {
    return {
      name: '',
      nameErrMsg: '',
      password: '',
      passwordErrMsg: '',
      email: '',
      emailErrMsg: '',
      job: '',
      intro: '',
      photoUrl: '',
      articleTypes: [],
      canSubmit: true
    }
  },
  computed: {
    ...mapState('account', {
      admin: state => state.admin
    }),
    ...mapState('articles', {
      types: state => state.types,
      typesId: state => state.typesId
    })
  },
  created() {
    Object.assign(this.$data, this.admin)
    this.password = ''
    this.articleTypes = this.types.concat()
  },
  methods: {
    ...mapActions('account', ['uploadAvatar', 'updateBlog']),
    getAccountInfo(o) {
      this.name = o.value
      this.nameErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    getPasswordInfo(o) {
      this.password = o.value

      if (o.value) {
        this.passwordErrMsg = o.errMsg
      } else {
        this.passwordErrMsg = ''
      }
      this.checkoutSubmit()
    },
    getEmailInfo(o) {
      this.email = o.value
      this.emailErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    getJobInfo(o) {
      this.job = o.value
      this.jobErrMsg = o.errMsg
    },
    getIntroInfo(o) {
      this.intro = o.value
      this.introErrMsg = o.errMsg
    },
    checkoutSubmit() {
      let canSubmit = true

      each([this.name, this.email], value => {
        if (!value.trim()) {
          canSubmit = false
          return false
        }
      })

      each([this.nameErrMsg, this.passwordErrMsg, this.emailErrMsg], errMsg => {
        if (errMsg) {
          canSubmit = false
          return false
        }
      })

      this.canSubmit = canSubmit
    },
    renewBlog() {
      const { name, photoUrl, password, email, job, intro, articleTypes } = this
      const admin = {
        name,
        password,
        email,
        job,
        intro,
        photoUrl
      }
      const types = {
        id: this.typesId,
        data: articleTypes
      }

      asyncHandler(() =>
        this.updateBlog({ admin, types }).then(() =>
          this.$uiv_notify({
            type: 'success',
            content: '更新成功'
          })
        )
      )
    }
  }
}
</script>

<style lang="scss">
.inside-admin {
  .form-group:last-of-type {
    text-align: right;
  }
  .photo {
    position: relative;
    margin: 0 auto;
    margin-bottom: 10px;
    width: 150px;
    height: 150px;
    border: 4px solid #eee;
    border-radius: 50%;
    overflow: hidden;
    transform: translateZ(0);
    transition: all 0.25s ease-in-out;
    img {
      width: 100%;
      height: 100%;
      transition: all, 0.5s ease-in-out;
      &:hover {
        transform: scale(1.2, 1.2) translate(-5%, 7%);
      }
    }
  }
}
</style>
