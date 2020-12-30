<template>
  <div :class="$style.item">

    <div :class="$style.top">
      <div :class="$style.rating">
        <img src="~assets/rating.png" alt="rating">
        <span>{{ item.rating }}</span>
      </div>
      <div :class="$style.add" @click="toggleAddRemove">
        <img src="~assets/add-to-cart.png" alt="add to cart">
        <div v-show="item.inCart" :class="$style.added">&#10003;</div>
      </div>
      <div :class="$style.photo">
        <img :src="photo" alt="item photo">
      </div>
    </div>
    <div :class="$style.bottom">
      <div :class="$style.title">{{ name }}</div>
      <div :class="$style.price">{{ item.price }}&nbsp;&#8381;</div>
    </div>
  </div>
</template>

<script>
import {host} from '~/api';

export default {
  data() {
    return {
      loading: true,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toggleAddRemove() {
      if (this.item.inCart) {
        this.removeFromCart();
      } else {
        this.addToCart();
      }
    },
    addToCart() {
      this.$store.dispatch('cart/addToCart', this.item);
      this.$store.dispatch('items/toggleAddMark', this.item);

      if (process.browser) {
        window.localStorage.setItem('cart', JSON.stringify(this.$store.getters['cart/cart']));
      }
    },
    removeFromCart() {
      this.$store.dispatch('cart/removeFromCart', this.item);
      this.$store.dispatch('items/toggleAddMark', this.item);

      if (process.browser) {
        window.localStorage.setItem('cart', JSON.stringify(this.$store.getters['cart/cart']));
      }
    },
  },
  computed: {
    name() {
      return this.item.name.toLowerCase().
        split(' ').
        map(word => word.charAt(0).toUpperCase() + word.substring(1)).
        join(' ');
    },
    photo() {
      return host + this.item.photo;
    },
  },
};
</script>

<style module lang="scss">
.item {
  position: relative;
  width: 264px;
  height: 272px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin: 8px;
  transition: all .1s;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .top {
    position: relative;

    .photo {
      display: flex;
      justify-content: center;

      img {
        height: 180px;
        width: auto;
      }
    }

    .rating {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      display: flex;
      align-items: center;

      img {
        height: 20px;
        width: 20px;
      }

      span {
        font-weight: bold;
        font-size: 10px;
        line-height: 20px;
        color: $yellow;
        padding: 2px 0 0 2px;
      }
    }

    .add {
      position: absolute;
      top: 0;
      right: 0;
      height: 16px;
      width: 16px;
      cursor: pointer;
      opacity: .5;

      &:hover {
        opacity: 1;
      }
    }

    .added {
      position: absolute;
      top: -1px;
      right: -2px;
      font-size: 18px;
      height: 16px;
      width: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .bottom {

    .title {
      text-transform: capitalize;
      font-size: 14px;
      line-height: 18px;
      color: $grey;
      padding-bottom: 6px;
    }
  }
}
</style>
