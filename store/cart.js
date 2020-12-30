export const state = () => ({
  cart: [],
});

export const mutations = {
  addToCart(state, cart) {
    state.cart.push(cart);
  },
  setCart(state, cart) {
    state.cart = cart;
  },
};

export const actions = {
  addToCart({commit}, payload) {

    commit('addToCart', payload);
  },
  removeFromCart({commit, state}, payload) {
    const cart = state.cart.filter(item => item.id !== payload.id);

    commit('setCart', cart);
  },
  setCart({commit}, payload) {

    commit('setCart', payload);
  },
};

export const getters = {
  cart: state => state.cart,
};
