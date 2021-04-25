// TS types
interface User{
  username: string
}

export const state = () => ({
  user:{
    username: '',
  },
  isAuth: false
})

export const mutations = {
  // Login in
  LOGIN_IN (state: { user: User, isAuth: boolean }, username: string) {
    if(!username) {
      state.isAuth = false
      state.user.username = ''
    }
    state.user.username = username
    state.isAuth = false
  },
  // Logout
  LOGOUT (state: { isAuth: boolean; user: { username: string } }) {
    state.isAuth = false
    state.user.username = ''
  }
}

export const getters = {
  getUser: (state: { user: User }) => state.user,
  checkAuth: (state: { isAuth: boolean }) => state.isAuth
}
