<template>
  <header :class="$style.header">
    <div :class="$style.wrapper">
      <div :class="$style.title">TestList</div>
      <div :class="$style.cart" @click="showCart">
        <img src="~assets/cart.png" alt="cart">
        <div :class="$style.count">{{ itemsInCart }}</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    showCart() {
      this.$emit('showCart', true);
    },
  },
  computed: {
    itemsInCart(){
      return this.$store.getters['cart/cart'].length
    }
  }
};
</script>

<style module lang="scss">
.header {
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  height: 66px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  background: $white;
  z-index: 1;

  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 88px;
    margin-right: 102px;

    .title {
      font-weight: bold;
      font-size: 22px;
      line-height: 28px;
    }

    .cart {
      position: relative;
      cursor: pointer;

      img {
        height: 32px;
        width: 32px;
      }

      .count {
        position: absolute;
        height: 12px;
        width: 12px;
        top: 0;
        right: -2px;
        background: $grey-light;
        border-radius: 50%;
        color: $white;
        font-weight: bold;
        font-size: 8px;
        line-height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 2px;
      }
    }
  }
}
</style>
