<template>
  <footer class="footer">
    <content-box class="footer__content">
      <p class="footer__copyright"></p>
      <div class="footer__menu">
        <ul class="footer__socials">
          <li class="footer__social">
            <a href="https://github.com/anton-zm" target="_blank">
              <img src="gh.png" alt="github" class="footer__icon" />
            </a>
          </li>
          <li class="footer__social">
            <a
              href="https://t.me/Antonzm"
              target="_blank"
              class="footer__social-container"
            >
              <img src="tlg.png" alt="telegram" class="footer__icon" />
            </a>
          </li>
        </ul>
      </div>
    </content-box>
  </footer>
</template>

<script>
import Content from '@/components/content'
export default {
  components: {
    'content-box': Content,
  },
  mounted() {
    const copyrigth = document.querySelector('.footer__copyright')
    copyrigth.textContent = `© ${new Date().getFullYear()} for Takeoff Staff`
  },
}
</script>

<style scoped>
.footer {
  padding: 30px 0;
}
.footer__content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.footer__copyright {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #b6bcbf;
}
.footer__menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
}

.footer__icon {
  width: 20px;
  height: 20px;
  margin-left: 28px;
  transition: 0.3s;
  transform: translateY(4px);
}
.footer__icon:hover {
  opacity: 0.8;
}

.footer__social {
  line-height: 48px;
}
.footer__socials {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  padding: 0;
}
.footer__social-container {
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 525px) {
  .footer__content {
    flex-direction: column;
  }
  .footer__copyright {
    order: 11;
    margin-top: 38px;
  }

  .footer__menu-item {
    flex-direction: column;
  }
  .footer__social {
    line-height: 48px;
  }
}
</style>
