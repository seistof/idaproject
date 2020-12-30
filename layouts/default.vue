<template>
  <div :class="$style.container">
    <AppHeader @showCart="toggleCart"/>
    <Menu/>
    <Cart v-show="isCartOpen" @hideCart="toggleCart"/>
    <Nuxt/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader';
import Menu from '~/components/sideMenu/Menu';
import Cart from '~/components/cart/Cart';

export default {
  data() {
    return {
      isCartOpen: false,
    };
  },
  components: {Cart, Menu, AppHeader},
  methods: {
    toggleCart(token) {
      this.isCartOpen = token;
    },
  },
};
</script>

<style module lang="scss">
html {
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  height: 100vh;
  overflow: hidden;
}
</style>

