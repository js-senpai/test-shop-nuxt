<template>
  <div v-if="show"  class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
    <div class="flex items-center justify-center min-h-screen  text-center sm:block sm:p-0">
      <transition
       enter-class="ease-out duration-300"
       enter-active-class="opacity-0"
       enter-to-class="opacity-100"
       leave-class="ease-in duration-200"
       leave-active-class="opacity-100"
       leave-to-class="opacity-0"
      >
        <div @click.self="togglePopup" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <transition
        enter-class="ease-out duration-300"
        enter-active-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-class="ease-in duration-200"
        leave-active-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div class="flex justify-between items-center">
                <h3 class="mr-1 text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ title || (loginIn ? 'Авторизироваться':'Зарегистрироваться') }}
                </h3>
                <button class="auth-popup__close text-gray-600" @click="togglePopup"><i class="fas fa-times"></i></button>
              </div>
              <div class="mt-2">
                <div class="auth-popup__form">
                  <div class="auth-popup__form-item">
                    <label for="login-name">Логин:</label>
                    <input
                      type="text"
                      id="login-name"
                      name="login-name"
                      placeholder="Введите логин"
                      v-validate="'required|alpha_num|min:3|max:30'"
                      maxlength="30"
                      :class="{'error' : errors.has('login-name')}"
                      class="mb-2"
                      v-model.trim="login"
                    />
                    <span class="text-red-400 mb-2 text-xs leading-4 block" v-show="errors.has('login-name')">Поле должно состоять только из букв и цифр без символов. Минимальное количество символов 3,максимальное 30.</span>
                  </div>
                  <div class="auth-popup__form-item">
                    <label for="login-password">Пароль:</label>
                    <input
                      type="password"
                      id="login-password"
                      name="login-password"
                      placeholder="Введите пароль"
                      v-validate="'required|min:4|max:100'"
                      maxlength="30"
                      :class="{'error' : errors.has('login-password')}"
                      class="mb-2"
                      v-model.trim="password"
                    />
                    <span class="text-red-400 mb-2 text-xs leading-4 block" v-show="errors.has('login-password')">Минимальное количество символов 3,максимальное 30.</span>
                  </div>
                  <span class="text-red-400 my-2 text-xs leading-4 block" v-show="error">{{ error }}</span>
                  <div class="auth-popup__form-item">
                    <button class="btn btn__submit auth-popup__btn auth-popup__btn-submit" :disabled="!validateForm " @click="submitChanges">{{ loginIn ? 'Войти':'Зарегистрироваться' }}</button>
                    <button class="btn auth-popup__btn auth-popup__btn-toggle" @click="toggleForm">{{ loginIn ? 'Зарегистрироваться':'Авторизироваться' }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters,mapActions,mapMutations } from 'vuex'
export default {
  data(){
    return {
      login: '',
      password: '',
    }
  },
  computed: {
   ...mapGetters({
     title: 'auth-popup/popupTitle',
     show: 'auth-popup/isActive',
     loginIn: 'auth-popup/isLoginIn',
     error: 'auth-popup/getError',
     user: 'sessionStorage/getUser'
   }),
    validateForm () {
      return !this.errors.any()
    },
 },
 methods: {
    ...mapMutations({
      toggleForm: 'auth-popup/TOGGLE_FORM',
      togglePopup: 'auth-popup/TOGGLE_POPUP'
    }),
    ...mapActions({
      signIn: 'auth-popup/auth',
    }),
    async submitChanges() {
      try {
        await this.signIn({username: this.login, password: this.password,isAuth: this.loginIn})
      } catch (e) {
        console.error(`${new Date()} Error in submit popup changes. Error: `,e)
      }
    }
 }
}
</script>
