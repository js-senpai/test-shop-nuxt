<template>
  <ul v-if="products.length" class="products-list">
    <li
        v-for="product in products"
        :key="product.id"
        class="products-list__item">
         <nuxt-link :to="{ name: 'product-id', params: { id: product.id } }">
           <div v-show="product.img" class="products-list__img">
             <img :data-src="product.img" :alt="product.title" :title="product.title" v-lazy-load>
           </div>
           <div v-show="product.title" class="products-list__title">{{ product.title }}</div>
           <div class="rating products-list__rating">
             <ul class="rating-list">
               <li v-for="(rating,index) in 5" :key="index" class="rating-list__item products-list__rating-item">
                 <i v-if="rating <= product.reviewsRate" class="fas fa-star rating-list__star rating-list__star-active"></i>
                 <i v-else class="far fa-star rating-list__star rating-list__star-deactive"></i>
               </li>
             </ul>
             <div v-show="product.reviewsCount" class="rating-count">{{ product.reviewsCount }} отзывов</div>
           </div>
         </nuxt-link>
    </li>
  </ul>
</template>
<style lang="sass">
@import "sass/products"
</style>
<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  async fetch() {
    try {
      await this.getProducts()
    } catch (e) {
      console.error(`${new Date()} Error in get products component. Error: `,e)
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/getProducts'
    })
  },
  methods: {
    ...mapActions({
      getProducts: 'products/getProducts'
    })
  }
}
</script>
