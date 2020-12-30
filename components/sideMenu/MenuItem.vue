<template>
  <div :class="$style.item">
    <nuxt-link
      :class="$style.link"
      :active-class="$style.active"
      :to="'/' + id">
      {{ name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
  },
};
</script>

<style module lang="scss">
.item {
  width: 160px;
  padding: 8px 0;

  .link {
    text-decoration: none;
    font-size: 16px;
    line-height: 21px;
    color: $grey-light;

    &:hover {
      color: $grey;
    }
  }

  .active {
    text-decoration-line: underline;
    color: $black;
  }
}

</style>
