// TS Types
interface Review {
  id: number,
  product: number,
  created_by: {
    id: number,
    username: string
  },
  rate: number,
  text: string
  created_at: string
}

export const state = () => ({
  reviews: [],
})

export const mutations = {
  // Set review arr by product from api
  SET_REVIEWS (state: { reviews: Review[] }, reviews: Review[]) {
    if(!reviews.length){
      state.reviews = []
      return
    }
    state.reviews = reviews
  },
  ADD_REVIEW (state: { reviews: Review[] }, review: Review) {
    state.reviews.push(review)
  },
}

export const actions = {
  // Get reviews
  async getReviews({ commit }: { commit: any },id:number){
    if(isNaN(id)) return
    try {
      // @ts-ignore
      const getReviews = await this.$axios.$get(`/api/reviews/${id}`)
      if(getReviews.length){
        commit('SET_REVIEWS',getReviews)
      }
    } catch (e) {
      console.error(`${new Date()} Error in get reviews. Error: `,e)
    }
  },
  async addReview({commit}: { commit: any },{productID, review }:{ productID: number, review: Review } ) {
    if(!review || isNaN(productID)) return
    try {
      // @ts-ignore
      const { id } = await this.$axios.post(`/api/reviews/${productID}`,{
        ...review
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(typeof id !== 'undefined' && !isNaN(id)){
        review.id = id
        commit('ADD_REVIEW',review)
      }
    } catch (e) {
      console.error(`${new Date()} Error in update review. Error: `,e)
    }
  }
}
export const getters = {
  getReviews: (state: { reviews: Review[] }) => state.reviews,
}

