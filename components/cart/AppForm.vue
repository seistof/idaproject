<template>
  <div :class="$style.wrapper">
    <span :class="$style.header">Оформить заказ</span>
    <form @submit.prevent="onSubmit" :class="$style.form">
      <input :class="$style.item" type="text" placeholder="Ваше имя" required>
      <input
        :class="$style.item"
        type="tel"
        v-model="phone"
        name="phone"
        id="phone"
        placeholder="+7 777 777-77-77"
        autocomplete="tel"
        maxlength="16"
        class="form-control"
        v-phone
        pattern="\+7 [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}"
        required
      />
      <input :class="$style.item" type="text" placeholder="Адрес" required>
      <button :class="$style.item">Отправить</button>
    </form>
  </div>
</template>

<script>


export default {
  directives: {
    phone: {
      bind: el => {
        el.oninput = function(e) {
          if (!e.isTrusted) {
            return;
          }

          const x = this.value.replace(/\+.|\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

          this.value = !x[1] ? '' : !x[2] ? '+7 ' + x[1] : '+7 ' + x[1] + ' ' + x[2] + (x[3] ? '-' + x[3] : '') +
            (x[4] ? '-' + x[4] : '');
          el.dispatchEvent(new Event('input'));
        };
      },
    },
  },
  data() {
    return {
      phone: '',
    };
  },
  methods: {
    onSubmit(e) {
      console.log('Submit!');
      const client = {}
      client.name = e.target[0].value;
      client.phone = e.target[1].value;
      client.address = e.target[2].value;
      this.$emit('ordered', client);
    },
  },
};
</script>
<style module lang="scss">
.wrapper {
  padding-top: 30px;
}
.header {
  font-size: 18px;
  line-height: 23px;
  color: $grey;

}

.form {
  padding-top: 18px;
  align-self: flex-end;
  display: flex;
  flex-direction: column;

  .item {
    height: 50px;
    border-radius: 8px;
    padding: 0 14px;
    border: none;
    margin: 8px 0;
    font-size: 16px;
    line-height: 21px;
  }

  input {
    background: $grey-extra-light;
    color: $black;
  }

  button {
    background: $black;
    color: $white;
    cursor: pointer;

    &:hover {
      background: $grey;
    }
  }
}
</style>
