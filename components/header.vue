<template>
  <header class="header">
    <content-box class="header__content">
      <p class="header__logo" @click="toHome">TakeoffStaff</p>
      <nav class="header__menu">
        <nuxt-link
          v-if="!auth"
          to="/"
          class="header__link header__link_active"
        ></nuxt-link>
        <nuxt-link v-if="auth" to="/" class="header__link header__link_active"
          >Главная</nuxt-link
        >
        <nuxt-link v-if="auth" to="./contacts" class="header__link"
          >Мои контакты</nuxt-link
        >
        <button v-if="!auth" class="header__button" @click="showPopUp">
          Авторизоваться
        </button>
        <button v-if="auth" class="header__button" @click="exit">
          {{ btnText }}
          <img src="logout.png" alt="Выйти" class="header__button-img" />
        </button>
      </nav>
      <div class="header__menu-icon" id="mobile-menu-icon">
        <img src="menu.svg" alt="Меню" />
      </div>
    </content-box>
    <mobile-menu />
    <div class="header__line"></div>
    <div class="content">
      <div class="header__headings">
        <h1 class="header__title">Тестовое задание</h1>
        <p class="header__subtitle">Написать приложение личного кабинета.</p>
      </div>
    </div>
    <popup>
      <sign-in v-if="signInShown" @showForm="showNeedForm" />
      <sign-up v-if="signUpShown" @showForm="showNeedForm" />
      <success v-if="successShown" @signIn="showNeedForm" />
    </popup>
  </header>
</template>

<script>
import Content from '@/components/content'
import Mobile from '@/components/mobile'
import Popup from '@/components/popup'
import SignInForm from '@/components/forms/signin'
import SignUpForm from '@/components/forms/signup'
import SuccessForm from '@/components/forms/success'
import axios from 'axios'
export default {
  computed: {
    signInShown() {
      return this.$store.getters['popup/getSignInShown']
    },
    signUpShown() {
      return this.$store.getters['popup/getSignUpShown']
    },
    successShown() {
      return this.$store.getters['popup/getSuccessShown']
    },
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    showPopUp() {
      this.$store.commit('popup/togglePopUp')
    },
    showNeedForm() {
      this.$store.commit('popup/toggleSignUp')
      this.$store.commit('popup/toggleSignIn')
    },
    exit() {
      confirm('Вы хотите выйти?')
      localStorage.clear()
      window.location.reload()
    },

    test() {
      console.log('JKKKKKKK')
    },
  },
  data() {
    return {
      btnText: 'Авторизоваться',
      auth: false,
    }
  },
  components: {
    'content-box': Content,
    'mobile-menu': Mobile,
    popup: Popup,
    'sign-in': SignInForm,
    'sign-up': SignUpForm,
    success: SuccessForm,
  },

  mounted() {
    const JWT_TOKEN = localStorage.getItem('token')
    console.log(JWT_TOKEN)
    if (JWT_TOKEN && JWT_TOKEN !== undefined) {
      return axios
        .get('https://api.diploma.ml/users/me', {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        })
        .then((response) => {
          this.auth = true
          this.btnText = response.data.name
        })
    }
  },
}
</script>

<style scoped>
.header {
  background-image: url('../static/banner.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 80px;
  background-attachment: fixed;
}
.header__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.header__logo {
  font-family: Roboto Slab, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}

.header_articles {
  padding-bottom: 0;
  background-image: none;
}
.header__button {
  margin-left: 32px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 100px;
  background-color: transparent;
  padding: 12px;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.header__button-img {
  margin-left: 5px;
}

.header__headings {
  width: 608px;
  margin: 80px auto 0;
  color: white;
}
.header__line {
  background: rgba(196, 196, 196, 0.01);
  box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.2);
  height: 1px;
}
.header__link {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #b6bcbf;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 34px;
  min-height: 80px;
  box-sizing: border-box;
}
.nuxt-link-exact-active {
  color: #ffffff;
  border-bottom: 3px solid white;
}
.header__menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header__menu-icon {
  width: 24px;
  height: 24px;
  display: none;
  box-sizing: border-box;
}
.header__menu-icon_disabled {
  display: none;
}
.header__title {
  font-family: Roboto Slab, Arial, Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 64px;
  margin: 0;
}
.header__subtitle {
  font-family: Roboto, Arial, Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  margin: 32px 0 0;
}
.header__mobile-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.header__mobile {
  display: none;
}

@media screen and (max-width: 620px) {
  .header__menu {
    display: none;
  }
  .header__menu_mobile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .header__menu-icon {
    display: block;
  }
}

@media screen and (max-width: 768px) {
  .header {
    padding-bottom: 48px;
    background-attachment: unset;
  }
  .header__button {
    font-size: 16px;
  }
  .header__headings {
    width: 448px;
    margin: 38px auto 0;
  }
  .header__link {
    font-size: 16px;
    min-height: 66px;
  }
  .header__title {
    font-size: 36px;
    line-height: 40px;
    padding-right: 100px;
  }
  .header__subtitle {
    margin: 16px 0 0;
  }
}
@media screen and (max-width: 500px) {
  .header__headings {
    width: 80%;
  }
  .header__title {
    padding-right: 0;
  }
}

@media screen and (max-width: 320px) {
  .header {
    padding-bottom: 32px;
  }
  .header__button {
    font-size: 18px;
    width: 100%;
    margin-left: 0;
    display: block;
  }
  .header__headings {
    width: 100%;
    margin: 30px 0 0;
  }
  .header__link {
    color: #ffffff;
    margin-left: 0;
  }
  .header__logo {
    font-size: 16px;
  }
  .header__subtitle {
    margin: 18px 0 0;
  }

  .header__mobile {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: 0;
  }
}
</style>
