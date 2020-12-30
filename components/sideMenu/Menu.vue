<template>
  <div :class="$style.menu">
    <div :class="$style.title">Каталог</div>
    <MenuItem
      v-for="category in categories"
      :key="category.id"
      :id="category.id"
      :name="category.name"
    />
  </div>
</template>

<script>
import MenuItem from '~/components/sideMenu/MenuItem';

export default {
  computed: {
    categories() {
      return this.$store.getters['categories/categories'];
    },
  },
  components: {MenuItem},
};
</script>

<style module lang="scss">
.menu {
  position: fixed;
  top: 98px;
  left: 88px;

  .title {
    font-weight: bold;
    font-size: 32px;
    line-height: 41px;
    color: $black;
    padding-bottom: 16px;
  }
}
</style>
