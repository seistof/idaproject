import api from '~/api';

export const state = () => ({
  items: [],
});

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
};

export const actions = {
  async fetch({commit}) {
    try {
      const data = await api.fetchItems();
      const items = data.map(item => {
        item.inCart = false;
        return item;
      });
      commit('setItems', items);
    } catch (e) {
      console.log(e);
    }
  },
  toggleAddMark({commit, state}, item) {
    const index = state.items.findIndex(i => i.id === item.id);
    const items = [...state.items];
    items.splice(index, 1, {
      ...item,
      inCart: !state.items[index].inCart,
    });
    commit('setItems', items);
  },
  markInCartItems({commit, state}, cart) {
    const ids = cart.map(item => item.id);
    const items = state.items.map(item => {
      return {
        ...item,
        inCart: ids.includes(item.id),
      };

    });
    commit('setItems', items);
  },
  removeAddMarks({commit, state}) {
    const items = state.items.map(item => {
      return {
        ...item,
        inCart: false,
      };
    });

    commit('setItems', items);
  },
};

export const getters = {
  items: state => state.items,
  sortedItems: state => id => state.items.filter(i => i.category === +id),
};
