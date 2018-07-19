<template>
  <div class="main-page">
    <Asidebar :data="asidebarIcons">
      <!-- <ListGroup slot="glyphicon-folder-open"></ListGroup> -->
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
          Author Component
        </div>
        <div class='col-lg-10 col-sm-9'>
          <router-view />
        </div>
      </div>
    </div>
    <SigninModal :visible.sync="signinModalVisible" />
    <SignupModal :visible.sync="signupModalVisible" />
  </div>
</template>

<script>
import Asidebar from '../components/Asidebar.vue'
import ListGroup from '../components/ListGroup.vue'
import Search from '../components/SearchInput.vue'
import SigninModal from '../components/ModalSignin.vue'
import SignupModal from '../components/ModalSignup.vue'

export default {
  name: 'main-page',
  components: {
    Asidebar,
    ListGroup,
    Search,
    SigninModal,
    SignupModal
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
  methods: {
    toggleSiginModal() {
      this.signinModalVisible = true
    },
    toggleSigupModal() {
      this.signupModalVisible = true
    },
    search(value) {
      alert(value)
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
</style>
