export const host = 'https://frontend-test.idaproject.com';

export default {
  fetchItems: async () => {
    const response = await fetch(host + '/api/product');

    return await response.json();
  },
  fetchCategories: async () => {
    const response = await fetch(host + '/api/product-category');

    return await response.json();
  },
};
