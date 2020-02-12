import rootStore from '@vue-storefront/core/store';

export default async (forWhat: string) => {
  const [category] = await rootStore.dispatch('wp_post/load', {
    type: 'categories',
    slug: '',
    fields: ['slug'],
    perPage: 1,
    beforeRequest(url) {
      return `${url}&filter[meta_key]=category_for&filter[meta_compare]=LIKE&filter[meta_value]=${forWhat}`;
    }
  });

  return category
}