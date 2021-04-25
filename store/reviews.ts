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
}

export const state = () => ({
  reviews: [],
  review: {
    id: 0,
    product: 0,
    created_by: {
      id: 0,
      username: ''
    },
    rate: 0,
    text: ''
  }
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
  SET_REVIEW (state: { id: number, reviews: Review[], review: Review }, id: number) {
    if(!state.reviews.length || isNaN(id)) return
    // Get review by ID
    const findByID:number = state.reviews.findIndex(item => item.id === id)
    if(findByID === -1) return;
    state.review = state.reviews[findByID]
  },
}

export const getters = {
  getReviews: (state: { reviews: Review[] }) => state.reviews,
  getReview: (state: { review: Review }) => state.review
}

