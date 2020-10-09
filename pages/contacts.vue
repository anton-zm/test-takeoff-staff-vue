<template>
  <main>
    <section class="saved-headings">
      <content-box id="articles-page-headings">
        <p class="saved-headings__amount">
          <span id="saved-user-name">${name}, </span> у вас ${array.length}
          сохранённых контактов
        </p>
        <button class="add-btn">Добавить контакт</button>
      </content-box>
    </section>

    <section class="result result_articles">
      <div class="content result__content">
        <div class="result__container result__container_articles"></div>
      </div>
    </section>
  </main>
</template>

<script>
import Content from '@/components/content'
export default {
  components: {
    'content-box': Content,
  },
  mounted() {
    const headerTitle = document.querySelector('.header__title')
    const headerSubtitle = document.querySelector('.header__subtitle')
    headerTitle.textContent = 'Мои контакты'
    headerSubtitle.textContent = ''
  },
}
</script>

<style scoped>
.saved-headings {
  padding-bottom: 56px;
}
.saved-headings__title {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: rgba(26, 27, 34, 0.5);
  margin: 40px auto 0 0;
}
.saved-headings__amount {
  font-family: Roboto Slab, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 46px;
  color: #1a1b22;
  max-width: 530px;
  margin: 28px auto 0 0;
}
.add-btn {
  outline: none;
  border: 1px solid black;
  background-color: transparent;
  padding: 15px;
  margin-top: 24px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .saved-headings__title {
    font-size: 14px;
    margin: 0;
  }
  .saved-headings__amount {
    font-size: 30px;
    line-height: 34px;
    margin: 16px auto 0 0;
  }
}
@media screen and (max-width: 320px) {
  .saved-headings__title {
    font-size: 12px;
  }
}
</style>
