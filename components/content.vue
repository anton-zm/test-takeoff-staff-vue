<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.content {
  margin: 0 auto;
  max-width: 1230px;
}
@media screen and (max-width: 1229px) {
  .content {
    padding: 0 40px;
  }
}

@media screen and (max-width: 420px) {
  .content {
    padding: 0 16px;
  }
}
</style>
