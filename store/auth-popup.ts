export const state = () => ({
  isActive: false,
  isLoginIn: true,
  title: '',
  errorText: ''
})

export const mutations = {
  TOGGLE_POPUP(state: { isActive: boolean, title: string | null, errorText: string },{...items}:{ title?: string, show?: boolean | undefined }){
    state.isActive = typeof items.show === 'undefined' ? !state.isActive: Boolean(items.show)
    state.title = state.isActive && items.title ? items.title: ''
    state.errorText = ''
  },
  TOGGLE_FORM(state: { isLoginIn: boolean, errorText: string }){
    state.isLoginIn = !state.isLoginIn
    state.errorText = ''
  },
  // Set sass
  SET_ERROR (state: { errorText: string }, text: string) {
    state.errorText = text
  }
}

export const actions = {
  async auth({commit}: { commit: any },{username,password,isAuth = false}: { username: string; password: string; isAuth: boolean }) {
    if(!username || !password) return
    try {
      const authRoute = isAuth ? '/api/login/' : '/api/register/'
      // @ts-ignore
      const { token,message } = await this.$axios.$post(authRoute, {
        username, password
      },{
        headers: {
           'Content-Type': 'application/json'
        }
      })
      if(token) {
        commit('sessionStorage/LOGIN_IN',{ user: { id: 0,username }, token },{root: true})
        commit('TOGGLE_POPUP',{ show: false })
      } else if(message){
        commit('SET_ERROR', message)
      }
    } catch (e) {
      console.error(`${new Date()} Error in register user. Error: `,e)
    }
  }
}

export const getters = {
  isActive: (state: { isActive: boolean }) => state.isActive,
  isLoginIn: (state: { isLoginIn: boolean }) => state.isLoginIn,
  popupTitle: (state: { title: string | null }) => state.title,
  getError: (state: { errorText: any }) => state.errorText
}

