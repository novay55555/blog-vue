<template>
  <div class="main-page">
    <Asidebar :data="asidebarIcons">
      <ListGroup slot="glyphicon-folder-open" :data="articleTypes" />
      <Search 
        slot="glyphicon-search" 
        class="feature-search"
        @on-search="search"
      />
      <ListGroup slot="glyphicon-send" :data="routeMap" />
      <ListGroup slot="glyphicon-th" :data="userCtrls" />
    </Asidebar>
    <div class="container-fluid">
      <div class="row">
        <div class='col-lg-2 col-sm-3'>
          <Author :data="admin" />
        </div>
        <div class='col-lg-10 col-sm-9'>
          <slot></slot>
        </div>
      </div>
    </div>
    <SigninModal 
      :visible.sync="signinModalVisible"
      @signin="login" 
    />
    <SignupModal 
      :visible.sync="signupModalVisible" 
      @signup="register"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Asidebar from '../components/Asidebar.vue'
import ListGroup from '../components/ListGroup.vue'
import Search from '../components/SearchInput.vue'
import SigninModal from '../components/ModalSignin.vue'
import SignupModal from '../components/ModalSignup.vue'
import Author from '../components/Author.vue'

export default {
  name: 'main-page',
  components: {
    Asidebar,
    ListGroup,
    Search,
    SigninModal,
    SignupModal,
    Author
  },
  data() {
    return {
      asidebarIcons: [
        {
          icon: 'glyphicon-folder-open',
          slotName: 'glyphicon-folder-open'
        },
        {
          icon: 'glyphicon-search',
          slotName: 'glyphicon-search'
        },
        {
          icon: 'glyphicon-send',
          slotName: 'glyphicon-send'
        },
        {
          icon: 'glyphicon-th',
          slotName: 'glyphicon-th'
        }
      ],
      signinModalVisible: false,
      signupModalVisible: false
    }
  },
  computed: {
    ...mapState('articles', {
      articleTypes: function(state) {
        let types = state.types.map(el => {
          let o = {
            link: {
              path: '/search',
              query: {
                type: el,
                page: 1
              }
            },
            text: el,
            handler: async to => {
              // search路由是根据query变化而请求相应的数据的
              // 因此路由组件是相同的, 所以要在这里换取相应的数据
              // 其他路由则根据asyncData来获取数据
              if (to.path === this.$route.path) {
                this.$Progress.start()
                await this.searchArticlesByType(to.query)
                this.$Progress.finish()
              }
              this.$router.push(to)
            }
          }
          return o
        })
        types.unshift({
          link: {
            path: '/articles/1',
            query: {}
          },
          text: '/',
          handler: async to => {
            this.$Progress.start()
            await this.saveArticles(1)
            this.$Progress.finish()
            this.$router.push(to)
          }
        })
        return types
      }
    }),
    ...mapState('account', ['admin', 'isAdmin', 'username']),
    routeMap() {
      let arr = [
        {
          link: '/study',
          text: 'スタディー'
        }
      ]

      if (this.isAdmin)
        arr.push({
          link: '/inside-world/articles',
          text: '里世界'
        })

      return arr
    },
    userCtrls() {
      let arr = [
        {
          link: '#',
          text: '登录',
          handler: () => {
            this.toggleSiginModal()
          }
        },
        {
          link: '#',
          text: '注册',
          handler: () => {
            this.toggleSigupModal()
          }
        }
      ]

      if (this.username) {
        arr = [
          {
            link: '#',
            text: this.username,
            handler: () => {}
          },
          {
            link: '#',
            text: '登出',
            handler: () => {
              this.signout()
            }
          }
        ]
      }

      return arr
    }
  },
  methods: {
    ...mapActions('account', ['signin', 'signup', 'signout']),
    ...mapActions('articles', [
      'searchArticlesByTitle',
      'searchArticlesByType',
      'saveArticles'
    ]),
    toggleSiginModal() {
      this.signinModalVisible = true
    },
    toggleSigupModal() {
      this.signupModalVisible = true
    },
    async search(title) {
      this.$Progress.start()
      if (!title.trim()) {
        await this.saveArticles(1)
        this.$router.push({ path: '/articles/1' })
      } else {
        await this.searchArticlesByTitle({
          title,
          page: 1
        })
        this.$router.push({
          path: '/search',
          query: {
            title,
            page: 1
          }
        })
      }
      this.$Progress.finish()
    },
    login(username, password) {
      this.signin({
        username,
        password
      })
        .then(() => {
          this.$uiv_notify({
            type: 'success',
            content: '登录成功'
          })
          this.signinModalVisible = false
        })
        .catch(err => {
          this.$uiv_notify({
            type: 'danger',
            content: err.message
          })
        })
    },
    register(username, password, email) {
      this.signup({
        username,
        password,
        email
      })
    }
  }
}
</script>

<style lang="scss">
.main-page {
  padding-top: 10px;
  padding-left: 75px;
  div[class*='col-lg-'] {
    float: right;
  }
}
@media (max-width: 767px) {
  .main-page {
    padding-top: 0;
    div[class*='col-lg-'] {
      float: none;
    }
    .col-lg-2 {
      min-height: 200px;
      color: #800080;
      background: linear-gradient(270deg, #b6fbff, #83a4d4);
    }
  }
}

@media (max-width: 500px) {
  .main-page {
    padding-left: 0;
  }
}
</style>
