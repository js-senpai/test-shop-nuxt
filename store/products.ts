// TS Types
interface Product {
  id: number
  img: string
  text: string
  title: string
  reviewsCount: number
  reviewsRate: number
}

export const state = () => ({
  products: [],
  product: {
    id: 0,
    img: '',
    text: '',
    title: 'Product',
    reviewsCount: 0
  }
})

export const mutations = {
  // Set product arr from api
  SET_PRODUCTS (state: { products: Product[] }, products: Product[]) {
    if(!products.length) {
      state.products = []
    }
    state.products = products
  },
  SET_PRODUCT (state: { id: number, products: Product[], product: Product }, id: number) {
    if(!state.products.length || isNaN(id)) return
    // Get product by ID
    const findByID:number = state.products.findIndex(item => item.id === id)
    if(findByID === -1) throw Error('Продукт не найден');
    state.product = state.products[findByID]
  },
}

export const actions = {
  // Get products
  // @ts-ignore
  async getProducts({commit}){
    try {
      // @ts-ignore
      const getProducts: Product[] = await this.$axios.$get('/api/products/')
      if(getProducts.length){
        for(let product of getProducts){
          if(product.img){
            // @ts-ignore
            product.img = `${this.$config.API_URL}/static/${product.img}`
          }
          if(product.id){
            // @ts-ignore
            // Get review by product id
            const getReviews = await this.$axios.$get(`/api/reviews/${product.id}`)
            if(getReviews.length){
              const getCount = getReviews.map(({rate}:{rate: number}):number => {
                return isNaN(rate) || rate > 5 || rate < 0 ? 0: rate
              }).reduce((current:number,next:number):number => {
                return current + next
              })
              product.reviewsRate = isNaN(getCount) ? 0: Math.floor(getCount / 5)
              product.reviewsCount = Math.floor(getCount)
            }
          }
        }
        commit('SET_PRODUCTS',getProducts)
      }
    } catch (e) {
      console.error(`${new Date()} Error in get products. Error: `,e)
    }
  },
  // Get product
  getProduct({ commit }:{ commit: any },id: number){
    if(isNaN(id)) return
    commit('SET_PRODUCT',+id)
  }
}

export const getters = {
  getProducts: (state: { products: Product[] }) => state.products,
  getProduct: (state: { product: Product }) => state.product
}

