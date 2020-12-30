import api from '~/api';

export const state = () => ({
  categories: [],
});

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
};

export const actions = {
  async fetch({commit}) {
    try {
      const categories = await api.fetchCategories();

      commit('setCategories', categories);
    } catch (e) {
      console.log(e);
    }
  },
};

export const getters = {
  categories: state => state.categories,
};
