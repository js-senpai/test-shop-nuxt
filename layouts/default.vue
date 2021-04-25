<template>
  <div class="main-container">
    <Header />
    <Nuxt />
    <AuthPopup />
  </div>
</template>
<script>
import Header from "../components/header/Header";
import AuthPopup from "../components/auth-popup/AuthPopup";
export default {
  components: {AuthPopup, Header}
}
</script>
