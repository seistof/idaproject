<template>
  <div :class="$style.item">
    <div :class="$style.photo">
      <img :src="photo" alt="">
    </div>
    <div :class="$style.description">
      <div :class="$style.title">{{ name }}</div>
      <div :class="$style.price">{{ item.price }}&nbsp;&#8381;</div>
      <div :class="$style.rating">
        <img src="~assets/rating.png" alt="rating star" :class="$style.rating">
        <span>{{ item.rating }}</span>
      </div>
    </div>
    <div @click="removeItem" :class="$style.remove">
      <img src="~assets/remove.png" alt="remove item">
    </div>
  </div>
</template>

<script>
import {host} from '@/api';

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    removeItem() {
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
  height: 120px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin: 6px 0;

  .photo {
    img {
      width: 90px;
    }
  }

  .description {
    position: relative;
    height: 100%;
    width: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-size: 14px;
      line-height: 18px;
      color: $grey;
    }

    .price {
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
      color: $black;
      padding-top: 6px;
    }

    .rating {
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
  }

  .remove {
    right: 0;
    opacity: .5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
