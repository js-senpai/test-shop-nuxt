// TS Types
interface Product {
  id: number
  img: string
  text: string
  title: string
}

export const state = () => ({
  products: [],
  product: {
    id: 0,
    img: '',
    text: '',
    title: 'Product'
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
    if(findByID === -1) return;
    state.product = state.products[findByID]
  },
}

export const getters = {
  getProducts: (state: { products: Product[] }) => state.products,
  getProduct: (state: { product: Product }) => state.product
}

