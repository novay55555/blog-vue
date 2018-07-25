<template>
  <Layout class="inside-admin">
    <Upload :photo="admin.photo" @on-upload="uploadAdminAvatar" />
    <Input 
      label="管理员帐号"
      placeholder="请输入管理员帐号"
      :current-value="name"
      :validates="[{
        rule: 'isNotEmpty',
        errMsg: '管理员帐号不能为空'
      }]"
      @get-info="getAccountInfo"
    />
    <Input 
      label="管理员密码"
      placeholder="请输入管理员密码"
      :current-value="password"
      @get-info="getPasswordInfo"
    />
    <Input 
      label="管理员邮箱"
      placeholder="请输入管理员邮箱"
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
      @get-info="getEmailInfo"
    />
    <Input 
      label="职业"
      placeholder="输入职业则会显示在首页"
      :current-value="job"
      @get-info="getJobInfo"
    />
    <Input 
      label="简介"
      placeholder="输入简介则会显示在首页"
      :current-value="intro"
      @get-info="getIntroInfo"
    />

    <div class="form-group">
      <button class="btn btn-info">Submit</button>
    </div>
  </Layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { each } from '../libs/utils.js'
import Layout from '../layouts/Inside.vue'
import Input from '../components/FormInput.vue'
import Upload from '../components/UploadAvatar.vue'

export default {
  name: 'inside-admin',
  components: {
    Layout,
    Input,
    Upload
  },
  asyncData({ store, ctx }) {
    return store.dispatch(
      'account/getFullAdmin',
      ctx ? { headers: ctx.headers } : {}
    )
  },
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
      photo: ''
    }
  },
  computed: {
    ...mapState('account', {
      admin: state => state.admin
    }),
    ...mapState('articles', {
      articleTypes: state => state.types
    })
  },
  created() {
    Object.assign(this.$data, this.admin)
    this.password = ''
  },
  methods: {
    ...mapActions('account', ['uploadAvatar']),
    getAccountInfo(o) {
      this.name = o.value
      this.nameErrMsg = o.errMsg
      this.checkoutSubmit()
    },
    getPasswordInfo(o) {
      this.password = o.value
      this.passwordErrMsg = o.errMsg
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

      each([this.nameErrMsg, this.emailErrMsg], errMsg => {
        if (errMsg) {
          canSubmit = false
          return false
        }
      })

      this.canSubmit = canSubmit
    },
    async uploadAdminAvatar(b64, uploadVm) {
      const result = await this.uploadAvatar({
        id: this.admin._id,
        b64
      })

      this.photo = result.avatar
      uploadVm.$cropper.attr('src', '')
      uploadVm.isUploadMode = false
    }
  }
}
</script>

<style>
</style>
