<template>
  <div class="container not-found">
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-else>{{ error.statusCode }} </h1>
    <NuxtLink class="btn btn__submit not-found__btn" to="/">Вернуться на главную страницу</NuxtLink>
  </div>
</template>
<style lang="sass">
@import "sass/error"
</style>
<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the sass page
}
</script>
