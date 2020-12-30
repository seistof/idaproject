<template>
  <div :class="$style.wrapper">
    <Catalog :items="items"/>
  </div>
</template>

<script>
import ProductItem from '~/components/catalog/ProductItem';
import Catalog from '~/components/catalog/Catalog';

export default {
  async fetch({store}) {
    await store.dispatch('items/fetch');
    await store.dispatch('categories/fetch');
  },
  mounted() {
    if (process.browser) {
      console.log(123);
      console.log(window.localStorage);
    }
  },
  computed: {
    items() {
      return this.$store.getters['items/items'];
    },
  },
  components: {Catalog, ProductItem},
};
</script>

<style module lang="scss">
.wrapper {
  margin-left: 248px;
  margin-top: 163px;
  margin-bottom: 66px;
  max-height: calc(100vh - 230px);
  overflow: auto;
}
</style>

