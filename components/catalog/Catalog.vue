<template>
  <div :class="$style.catalog">
    <AppSort @sortBy="sortType = $event"/>
    <LazyProductItem
      v-for="item in sortedItems"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import ProductItem from '~/components/catalog/ProductItem';
import AppSort from '~/components/AppSort.Vue';

export default {
  data() {
    return {
      sortType: '',
    };
  },
  computed: {
    items() {
      return this.$store.getters['items/sortedItems'](this.$route.params.categoryId);
    },

    sortedItems() {
      if (this.sortType === 'По цене') {
        return this.items.sort((a, b) => b.price - a.price);
      }
      if (this.sortType === 'По популярности') {
        return this.items.sort((a, b) => b.rating - a.rating);
      }
      return this.items;
    },
  },
  methods: {},

  components: {ProductItem, AppSort},
};
</script>

<style module lang="scss">
.catalog {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
</style>
