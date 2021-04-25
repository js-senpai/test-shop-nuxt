<template>
  <main class="container main">
   <Products />
  </main>
</template>

<script>
import Vue from 'vue'
import Products from "~/components/products/Products.vue";

export default Vue.extend({
  components: { Products }
})
</script>

