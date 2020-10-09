<template>
  <div v-if="popupShown" class="overlay" @click.self="showPopUp">
    <div class="popup">
      <img
        src="close.png"
        alt="Закрыть"
        class="popup__close"
        @click="showPopUp"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    popupShown() {
      return this.$store.getters['popup/getPopupShown']
    },
  },
  methods: {
    showPopUp() {
      this.$store.commit('popup/togglePopUp')
    },
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup {
  background-color: white;
  border-radius: 8px;
  min-width: 50px;
  min-height: 50px;
  position: relative;
}
.popup__close {
  position: absolute;
  top: -46px;
  right: -46px;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .popup__close {
    display: none;
  }
}
</style>
