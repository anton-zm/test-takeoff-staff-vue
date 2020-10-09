<template>
  <div class="mobile-menu">
    <div class="mobile-menu__container">
      <div class="content">
        <div class="mobile-menu__head">
          <img
            src="close.png"
            alt="Закрыть"
            id="mobile-cross"
            class="mobile-menu__icon menu-close"
          />
        </div>
        <div class="mobile-menu__line"></div>
        <nav class="mobile-menu__nav">
          <nuxt-link to="/" class="mobile-menu__link">Главная</nuxt-link>
          <nuxt-link to="./contacts" class="mobile-menu__link"
            >Мои контакты</nuxt-link
          >
          <button class="mobile-menu__button" id="auth-mobile-btn">
            Авторизоваться
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: 0;
}

.mobile-menu_opened {
  display: block;
}
.mobile-menu__button {
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
  margin-top: 22px;
}
.mobile-menu__container {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1a1b22;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  padding-bottom: 24px;
}
.mobile-menu__head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.mobile-menu__icon {
  width: 24px;
  height: 24px;
  display: block;
  box-sizing: border-box;
  position: relative;
  z-index: 99;
}
.mobile-menu__line {
  position: absolute;
  top: 56px;
  left: 0;
  background: rgba(196, 196, 196, 0.01);
  box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.2);
  height: 1px;
  width: 100%;
}
.mobile-menu__nav {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}
.mobile-menu__link {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 56px;
  color: white;
  text-decoration: none;
}
</style>
