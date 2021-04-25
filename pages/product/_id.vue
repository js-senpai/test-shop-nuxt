<template>
  <section class="product">
    <div class="container product__container">
      <div v-if="product" class="product__content">
        <div class="product__img">
          <img v-show="product.img" :data-src="product.img" :alt="product.title" :title="product.title" v-lazy-load>
        </div>
        <div class="product__info">
          <h1 v-show="product.title" class="product__title">{{ product.title }}</h1>
          <div class="product__text" v-html="product.text" />
        </div>
      </div>
      <div class="product__reviews">
        <h2 class="product__subtitle">Отзывы</h2>
        <ul class="rating-list mb-4">
          <li
            v-for="(rating,index) in 5"
            :key="index"
            class="rating-list__item product-list__rating-item"
            @mouseleave="chooseRate(index,'blur')"
            @mouseenter="chooseRate(index,'focus')"
            @click="chooseRate(index,'click')"
          >
            <i v-if="rating <= Math.floor(review.rate)" class="fas fa-star rating-list__star rating-list__star-active"/>
            <i v-else class="far fa-star rating-list__star rating-list__star-deactive"/>
          </li>
        </ul>
        <textarea v-model="review.text" class="product__reviews-textarea" name="review-textarea" id="review-textarea" />
        <button class="btn btn__submit product__reviews-submit" @click="saveChanges" :disabled="review.text.length === 0">Добавить отзыв</button>
        <ul v-if="reviews.length" class="product__reviews-list">
          <li v-for="review in reviews" :key="review.id" class="product__reviews-list__item">
            <header class="product__reviews-list__header">
              <div class="product__reviews-list__header-item">
                <div class="product__reviews-list__header-name">
                  {{ review.created_by.username }}
                </div>
                <div class="rating product-list__rating">
                  <ul class="rating-list">
                    <li v-for="(rating,index) in 5" :key="index" class="rating-list__item product-list__rating-item">
                      <i v-if="rating <= Math.floor(review.rate)" class="fas fa-star rating-list__star rating-list__star-active"></i>
                      <i v-else class="far fa-star rating-list__star rating-list__star-deactive"></i>
                    </li>
                  </ul>
                  <div v-show="product.reviewsCount" class="rating-count">{{ product.reviewsCount }} отзывов</div>
                </div>
              </div>
              <div v-show="review.created_at" class="product__reviews-list__header-item">
                <time class="product__reviews-list__header-date">{{  $moment(review.created_at).format('DD:MM:YYYY hh:mm:ss') }}</time>
              </div>
            </header>
            <div v-show="review.text" class="product__reviews-list__text" v-html="review.text" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style lang="sass">
@import "sass/product"
</style>
<script>
import { mapGetters,mapMutations,mapActions } from 'vuex'
// Default data
const defaultData = {
  id: 0,
  product: 0,
  created_by: {
    id: 0,
    username: ''
  },
  rate: 0,
  text: '',
  created_at: ''
}
export default {
  async asyncData({store,params:{ id },error}) {
    if(isNaN(id)) {
      error({ statusCode: 404, message: 'Продукт не найден' })
    }
    try{
      await store.dispatch('products/getProducts')
      await store.dispatch('reviews/getReviews',id)
      await store.dispatch('products/getProduct',id)
    } catch (e) {
      console.error(`${new Date()} Error in fetch product. Error: `,e)
      error({ statusCode: 404, message: 'Продукт не найден' })
    }
  },
  data(){
    return {
      review: defaultData,
      isChange: false
    }
  },
  mounted() {
    if(isNaN(this.product.id) && this.user.username){
      this.review.product = this.product.id
      this.review.created_by.username = this.user.username
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/getProducts',
      product: 'products/getProduct',
      reviews: 'reviews/getReviews',
      user: 'sessionStorage/getUser',
      checkAuth: 'sessionStorage/checkAuth'
    })
  },
  methods: {
    ...mapMutations({
      togglePopup: 'auth-popup/TOGGLE_POPUP'
    }),
    ...mapActions({
      addReview: 'reviews/addReview'
    }),
    // Save changes
    async saveChanges(){
      try {
        if(!this.checkAuth) {
          this.togglePopup({title:'Пожалуйста, авторизируйтесь или зарегистрируйтесь для того,чтобы оставить отзыв!'})
        } else {
          this.review.created_at = new Date()
          await this.addReview({ productID: +this.$route.params.id,review: this.review })
          this.isChange = false
        }
      } catch (e) {
        console.error(`${new Date()} Error in save changes in product review block. Error: `,e)
      }
    },
    // Choose rate
    chooseRate(index = 0,type = 'click') {
      console.log(type)
      switch (type) {
        case 'click':
          this.isChange = true
          this.review.rate = index + 1
          break
        case 'focus':
          this.isChange = false
          this.review.rate = index + 1
          break
        case 'blur':
          this.review.rate = !this.isChange?0:index + 1
          break
        default:
          this.isChange = true
          this.review.rate = index + 1
      }
    }
  }
}
</script>
