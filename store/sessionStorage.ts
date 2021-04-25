// TS types
interface User{
  username: string
}
// Default data
const defaultUser = {
  id: 0,
  username: '',
}
export const state = () => ({
  user:{
    id: 0,
    username: '',
  },
  token: '',
  isAuth: false
})

export const mutations = {
  // Login in
  LOGIN_IN (state: { user: User, isAuth: boolean, token: '' }, { user,token }: { user: User, token: string }) {
    if(typeof user.username !== 'string' || typeof token !== 'string') {
      state.isAuth = false
      state.user = defaultUser
      state.token = ''
      return
    }
    state.user =  user
    state.isAuth = false
    // @ts-ignore
    state.token = token
  },
  // Logout
  LOGOUT (state: { isAuth: boolean; user: { username: string }; token: string; }) {
    state.isAuth = false
    state.user.username = ''
    state.token = ''
  }
}

export const getters = {
  getUser: (state: { user: User }) => state.user,
  checkAuth: (state: { isAuth: boolean }) => state.isAuth
}
