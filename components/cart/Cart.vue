<template>
  <div :class="$style.cart">
    <div :class="$style.pane">
      <div :class="$style.header">
        <div :class="$style.title">Корзина</div>
        <div :class="$style.close" @click="hideCart">&#10005;</div>
      </div>
      <div v-if="cart.length" :class="$style.list">
        <div :class="$style.subtitle">Товары в корзине</div>
        <div :class="$style.goods">
          <CartItem
            v-for="item in cart"
            :item="item"
            :key="item.id"
          />
        </div>
      </div>
      <AppForm v-if="cart.length" @ordered="handleOrder"/>
      <div v-if="orderDone" :class="$style.done">
        <img src="~assets/done.png" alt="done">
        <span>Заявка успешно отправлена</span>
        <span>Вскоре наш менеджер свяжется с Вами</span>
      </div>
      <div v-if="!cart.length && !orderDone" :class="$style.empty">
        <span>Пока что вы ничего не добавили в корзину.</span>
        <button @click="hideCart">Перейти к выбору</button>
      </div>
    </div>
  </div>
</template>

<script>
import AppForm from '~/components/cart/AppForm';
import CartItem from '@/components/cart/CartItem';

export default {
  data() {
    return {
      orderDone: false,
    };
  },
  methods: {
    hideCart() {
      this.orderDone = false;
      this.$emit('hideCart', false);
    },
    handleOrder(client) {
      const cart = this.$store.getters['cart/cart'];
      const order = {...client, items: cart.map(item => item.id)};
      console.log(order);
      this.orderDone = true;
      this.$store.dispatch('cart/setCart', []);
      this.$store.dispatch('items/removeAddMarks');
      if (process.browser) {
        window.localStorage.removeItem('cart');
      }
    },
  },
  mounted() {
    if (process.browser && window.localStorage.getItem('cart')) {
      const cart = JSON.parse(window.localStorage.getItem('cart'));
      this.$store.dispatch('cart/setCart', cart);
      this.$store.dispatch('items/markInCartItems', cart);
    }
  },
  computed: {
    cart() {
      return this.$store.getters['cart/cart'];
    },
  },
  components: {CartItem, AppForm},
};
</script>

<style module lang="scss">
.cart {
  z-index: 2;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .2);
  transition: all .2s;

  .pane {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 460px;
    background: $white;
    border-radius: 8px 0 0 8px;
    padding: 48px;
    transition: all .2s;

    .done {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: calc(100% - 117px);

      img {
        display: block;
        height: 80px;
        width: 80px;
        margin-bottom: 26px;
      }

      span {
        text-align: center;

        &:nth-child(2) {
          font-weight: bold;
          font-size: 24px;
          line-height: 31px;
          color: #000;
        }

        &:nth-child(3) {
          font-size: 16px;
          line-height: 21px;
          color: $grey;
        }
      }
    }

    .empty {
      display: flex;
      flex-direction: column;

      span {
        font-size: 22px;
        line-height: 28px;
        color: #000;
      }

      button {
        margin-top: 24px;
        height: 50px;
        border-radius: 8px;
        padding: 0 14px;
        border: none;
        font-size: 16px;
        line-height: 21px;
        background: $black;
        color: $white;
        cursor: pointer;

        &:hover {
          background: $grey;
        }
      }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 0 24px 0;

      .title {
        font-weight: bold;
        font-size: 32px;
        line-height: 41px;
        color: $black;
      }

      .close {
        font-size: 20px;
        cursor: pointer;
      }
    }

    .list {
      position: relative;

      .subtitle {
        font-size: 18px;
        line-height: 23px;
        color: $grey;
        padding-bottom: 10px;
      }

      .goods {
        min-height: 264px;
        max-height: calc(100vh - 666px);
        overflow: auto;
      }
    }
  }
}
</style>
