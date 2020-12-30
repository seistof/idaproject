<template>
  <div :class="$style.wrapper">
    <Loading v-if="loading" :class="$style.loading"/>
    <Catalog v-else/>
  </div>
</template>

<script>
import ProductItem from '~/components/catalog/ProductItem';
import Catalog from '~/components/catalog/Catalog';

export default {
  data() {
    return {
      title: this.$store.getters['categories/categories'].filter(
        category => category.id === +this.$route.params.categoryId)[0].name,
      loading: true,
    }
      ;
  },
  head() {
    return {
      title: this.title,
    };
  },
  async fetch({store}) {
    if (!store.getters['items/items'].length || !store.getters['categories/categories'].length) {
      await store.dispatch('items/fetch');
      await store.dispatch('categories/fetch');
    }
  },
  mounted() {
    this.loading = false;
  },
  computed: {},
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

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

