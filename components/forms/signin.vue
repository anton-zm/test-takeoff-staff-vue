<template>
  <form
    @submit.prevent="signin"
    class="popup__form"
    id="sign-in-form"
    novalidate
  >
    <h3 class="popup__title">Вход</h3>
    <p class="popup__label">Email</p>
    <input
      name="email"
      type="email"
      class="popup__input"
      id="signin-input-email"
      placeholder="Введите почту"
      v-model="email"
      @input="validation"
      required
    />
    <p class="popup__error" id="signin-email-error"></p>
    <p class="popup__label">Пароль</p>
    <input
      name="password"
      type="password"
      class="popup__input"
      id="signin-input-password"
      minlength="8"
      maxlength="30"
      placeholder="Введите пароль"
      v-model="password"
      @input="validation"
      required
    />
    <p class="popup__error" id="signin-password-error"></p>
    <p class="popup__error popup__error_server" id="signin-server-error">
      {{ serverError }}
    </p>
    <button
      type="submit"
      class="popup__button"
      :class="{ popup__button_active: button }"
      id="signin-btn"
      disabled
    >
      Войти
    </button>
    <p class="popup__call">
      или
      <span
        @click="$emit('showForm')"
        class="popup__link"
        id="popup__signup-link"
        >Зарегистрироваться</span
      >
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      serverError: '',
      password: '',
      email: '',
      button: false,
    }
  },
  // anton@mail2323.ru
  methods: {
    validation() {
      const emailField = document.querySelector('#signin-input-email')
      const passwordField = document.querySelector('#signin-input-password')
      const btn = document.querySelector('#signin-btn')
      if (emailField.validity.valid && passwordField.validity.valid) {
        this.button = true
        btn.removeAttribute('disabled')
      } else {
        this.button = false
        btn.setAttribute('disabled', 'true')
      }
    },
    signin() {
      return fetch(`https://api.diploma.ml/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            return Promise.reject(res.message)
          }
          return res
        })
        .then((data) => {
          localStorage.setItem('token', data.token)

          return data
        })
        .then(() => {
          this.$store.commit('popup/togglePopUp')
          window.location.reload()
        })

        .catch((err) => {
          console.log(err)
          this.serverError = 'Неправильная почта или пароль'
        })
    },
  },
}
</script>

<style scoped>
.popup__form {
  background: #ffffff;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  width: 430px;
  padding: 34px 36px 28px;
  position: relative;
  box-sizing: border-box;
}
.popup__title {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  color: #1a1b22;
  margin: 0;
}
.popup__label {
  display: block;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #2f71e5;
  margin-top: 30px;
}
.popup__input {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  margin-top: 9px;
  padding-bottom: 10px;
  width: 100%;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  caret-color: #2f71e5;
}

.popup__input::placeholder {
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  opacity: 0.2;
}

.popup__input:focus {
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}
.popup__error {
  margin-top: 3px;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #ff0000;
}

.popup__error_server {
  margin: 17px auto 0;
  text-align: center;
}
.popup__button {
  margin: 8px auto 0;
  border-radius: 100px;
  width: 100%;
  border: none;
  outline: none;
  padding-bottom: 20px;
  padding-top: 20px;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}

.popup__button_active {
  background: #2f71e5;
  box-shadow: 0px 5px 15px rgba(14, 26, 57, 0.2);
  color: #ffffff;
  cursor: pointer;
}

.popup__button_disable {
  color: #b6bcbf;
  background: #e6e8eb;
}
.popup__call {
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #000000;
}
.popap__call_default {
  text-align: left;
}
.popup__link {
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #2f71e5;
  cursor: pointer;
  margin-top: 14px;
}
@media screen and (max-width: 320px) {
  .popup__form {
    width: 100vw;
    padding: 16px 16px 100px;
    position: fixed;
    top: 56px;
    left: 0;
  }
}
</style>
