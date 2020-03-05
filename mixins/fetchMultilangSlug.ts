export default (multilangSlug: string) => ({

  wordpress: {
    fields: ['content', 'acf'],
    slug: '',
    perPage: 1,
    beforeRequest (url) {
      return `${url}&filter[meta_key]=multilang_slug&filter[meta_value]=${multilangSlug}`;
    },
    beforeSave (data) {
      if (!data || data.length != 1) {
        console.log('[VueWordpress] Badly configured multilangSlug!')
        return data
      }
      return data.map(result => ({
        ...result,
        slug: multilangSlug
      }))
    }
  },

  computed: {
    wordpress () {
      return this.$store.state.wp_post.types
        && this.$store.state.wp_post.types.pages
        && this.$store.state.wp_post.types.pages[multilangSlug]
    },
  }
})