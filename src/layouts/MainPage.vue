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
          <Author />
        </div>
        <div class='col-lg-10 col-sm-9'>
          <slot></slot>
        </div>
      </div>
    </div>
    <SigninModal :visible.sync="signinModalVisible" />
    <SignupModal :visible.sync="signupModalVisible" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      routeMap: [
        {
          link: '/study',
          text: 'スタディー'
        },
        {
          link: '/inside-world',
          text: '里世界'
        }
      ],
      userCtrls: [
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
      ],
      signinModalVisible: false,
      signupModalVisible: false
    }
  },
  computed: mapState('articles', {
    articleTypes: state => {
      let types = state.types.map(el => ({
        link: {
          path: '/search',
          query: {
            type: el,
            page: 1
          }
        },
        text: el
      }))
      types.unshift({
        link: {
          path: '/articles/1',
          query: {}
        },
        text: '/'
      })
      return types
    }
  }),
  methods: {
    toggleSiginModal() {
      this.signinModalVisible = true
    },
    toggleSigupModal() {
      this.signupModalVisible = true
    },
    search(title) {
      if (!title.trim()) return this.$router.push({ path: '/articles/1' })
      this.$router.push({
        path: '/search',
        query: {
          title,
          page: 1
        }
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
