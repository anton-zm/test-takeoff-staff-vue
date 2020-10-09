<template>
  <form class="popup__form" id="success-form">
    <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
    <p class="popup__call popap__call_default" id="success-link">
      <span @click="signIn" class="popup__link">Выполнить вход</span>
    </p>
  </form>
</template>

<script>
export default {
  methods: {
    signIn() {
      this.$store.commit('popup/signin')
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
