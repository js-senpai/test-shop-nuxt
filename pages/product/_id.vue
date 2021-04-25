<template>
  <section class="product">
    <div class="container product__container">

    </div>
  </section>
</template>
<script>
  export default {
    async asyncData({$store,params:{ id }}) {
       console.log(id)
    }
  }
</script>
