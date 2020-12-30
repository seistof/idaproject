<template>
  <div :class="$style.sort" @mouseleave="hideDropdown">
    <div :class="$style.display" @click="toggleDropdown">
      Сортировать по:&nbsp; {{ sortBy }}
      <svg width="5" height="3" viewBox="0 0 5 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0H0L2.5 2.5L5 0Z" fill="#59606D"/>
      </svg>
    </div>
    <div :class="$style.dropdown" v-show="isDropdown">
      <div @click="onSelect" :class="$style.option">По цене</div>
      <div @click="onSelect" :class="$style.option">По популярности</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortType: 'цене',
      isDropdown: false,
    };
  },
  computed: {
    sortBy() {
      return this.sortType;
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdown = !this.isDropdown;
    },
    hideDropdown() {
      this.isDropdown = false;
    },
    onSelect(e) {
      this.$emit('sortBy', e.target.textContent);
      this.sortType = e.target.textContent.split(' ')[1];
      this.toggleDropdown();
    },
  },
};
</script>

<style module lang="scss">
.sort {
  width: 230px;
  position: absolute;
  top: 108px;
  right: 88px;
  font-size: 16px;
  line-height: 21px;
  color: $black;
  cursor: pointer;

  &:hover {
    .dropdown {
      display: block;
    }
  }

  .display {
    display: flex;
    align-items: center;

    svg {
      margin-left: 4px;
      margin-top: 2px;
    }
  }

  .dropdown {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background: $white;
  }

  .option {
    color: $grey-light;
    padding: 4px 0 4px 12px;

    &:hover {
      color: $black;
      background: $grey-extra-light;
    }
  }
}
</style>
