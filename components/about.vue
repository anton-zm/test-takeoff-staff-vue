<template>
  <section class="about">
    <content-box class="about__content">
      <picture>
        <source srcset="meTablet.jpg" media="(max-width: 768px)" />
        <source srcset="meMobile.jpg" media="(max-width: 420px)" />
        <img src="me.jpg" alt="Портрет автора" class="about__img" />
      </picture>
      <div class="about__text">
        <h2 class="content-title">Об авторе</h2>
        <p class="about__paragraph">
          Я - Антон Змановский, начинающий вэб-разработчик, сделал эту работу в
          качестве тестовой на вакансию Frontend-разработчика в компанию Takeoff
          Staff.
        </p>
        <p class="about__paragraph">
          В работе применены технологии: JavaScript, Vue (Nuxt.js)
        </p>
      </div>
    </content-box>
  </section>
</template>

<script>
import Content from '@/components/content'
export default {
  components: {
    'content-box': Content,
  },
}
</script>

<style scoped>
.about {
  padding: 80px 0;
}
.about__content {
  display: flex;
  flex-direction: row;
}
.about__img {
  border-radius: 50%;
}
.about__text {
  margin: 51px auto auto 56px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
}
.about__paragraph {
  margin: 24px auto 0;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #1a1b22;
}

@media screen and (max-width: 768px) {
  .about__text {
    margin: 0 auto auto 32px;
    max-width: 424px;
  }
  .about__paragraph {
    margin: 16px auto 0;
  }
}
@media screen and (max-width: 490px) {
  .about__content {
    flex-direction: column;
  }
}
@media screen and (max-width: 320px) {
  .about__img {
    width: 272px;
  }
  .about__text {
    margin: 24px auto auto 0;
  }
}
</style>
