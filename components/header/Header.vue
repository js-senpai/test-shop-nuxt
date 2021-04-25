<template>
  <header class="header">
    <div class="container header__container">
       <Logo />
       <AuthBlock />
    </div>
  </header>
</template>
<style lang="sass">
@import "sass/header"
</style>
<script>
import Logo from "./logo/Logo";
import AuthBlock from "./auth-block/AuthBlock";
export default {
  components: {AuthBlock, Logo}
}
</script>
