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
      :isLoading="isLoading"
      @signin="login" 
    />
    <SignupModal 
      :visible.sync="signupModalVisible" 
      :isLoading="isLoading"
      @signup="register"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { asyncHandler } from '../libs/utils.js'
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
      signupModalVisible: false,
      isLoading: false
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
            handler: to => {
              // search路由是根据query变化而请求相应的数据的
              // 因此路由组件是相同的, 所以要在这里换取相应的数据
              // 其他路由则根据ata来获取数据
              if (to.path === this.$route.path) {
                asyncHandler(() => this.searchArticlesByType(to.query))
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
          handler: to => {
            asyncHandler(() =>
              this.saveArticles(1).then(() => this.$router.push(to))
            )
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
    search(title) {
      if (!title.trim()) {
        asyncHandler(() =>
          this.saveArticles(1).then(() =>
            this.$router.push({ path: '/articles/1' })
          )
        )
      } else {
        asyncHandler(() => {
          return this.searchArticlesByTitle({
            title,
            page: 1
          }).then(() => {
            this.$router.push({
              path: '/search',
              query: {
                title,
                page: 1
              }
            })
          })
        })
      }
    },
    login(username, password) {
      asyncHandler(() => this.signin({ username, password }), {
        start: () => (this.isLoading = true),
        end: () => (this.isLoading = false)
      }).then(() => {
        this.$uiv_notify({
          type: 'success',
          content: '登录成功'
        })
        this.signinModalVisible = false
      })
    },
    register(username, password, email) {
      asyncHandler(
        () => {
          return this.signup({
            username,
            password,
            email
          })
        },
        {
          start: () => (this.isLoading = true),
          end: () => (this.isLoading = false)
        }
      ).then(() => {
        this.$uiv_notify({
          type: 'success',
          content: '注册成功'
        })
        this.signupModalVisible = false
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
