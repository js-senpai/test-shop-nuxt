<template>
  <div class="auth-block">
    <span v-show="checkAuth && user" class="pr-2">{{ user.username }}</span>
    <button class="auth-block__btn" @click="toggle"><i class="far fa-user"></i></button>
    <div v-show="activeLogout" class="auth-block__logout">
      <div class="auth-block__logout-container">
        <button class="auth-block__logout-btn" @click="logout">Выйти</button>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
@import "sass/auth-block"
</style>
<script>
import {mapGetters,mapMutations} from "vuex";

export default {
  data() {
    return {
      activeLogout: false
    }
  },
  computed: {
    ...mapGetters({
      checkAuth: 'sessionStorage/checkAuth',
      show: 'auth-popup/isActive',
      user: 'sessionStorage/getUser'
    }),
  },
  methods: {
    ...mapMutations({
      togglePopup: 'auth-popup/TOGGLE_POPUP',
      logoutUser: 'sessionStorage/LOGOUT'
    }),
    toggle(){
      if(!this.checkAuth){
        this.togglePopup()
      } else {
        this.activeLogout = !this.activeLogout
      }
    },
    logout() {
      this.activeLogout = false
      this.logoutUser()
    }
  }
}
</script>
