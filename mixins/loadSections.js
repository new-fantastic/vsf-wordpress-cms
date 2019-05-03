import config from 'config'
import rootStore from '@vue-storefront/store'
import { getLangByRoute } from '../util/GetLang'
import { ContentTypes } from '../types'

export default {
  computed: {
    wpData () {
      const lang = getLangByRoute(this.$route)
      const langComponentName = (this.$route.name).replace(`${lang !== 'pl' ? rootStore.state.storeView.url.substr(1) + '-' : ''}`, '')

      return this.$store.state.wp_rest_content.pages[config.wordpressCms.pages[langComponentName]]
        ? this.$store.state.wp_rest_content.pages[config.wordpressCms.pages[langComponentName]]
        : null
    }
  },
  async asyncData ({ store, route }) {
    const lang = getLangByRoute(route)
    const langComponentName = (route.name).replace(`${lang !== 'pl' ? rootStore.state.storeView.url.substr(1) + '-' : ''}`, '')
    if (
      config.wordpressCms.pages[route.name] ||
      config.wordpressCms.pages[langComponentName]
    ) {
      await store.dispatch('wp_rest_content/loadContent', {
        slug: config.wordpressCms.pages[langComponentName],
        lang,
        type: ContentTypes.Page
      })

      // if (wp) {
      //   let upsellObj = wp[0].acf.section.find((e) => {
      //     return e.acf_fc_layout === 'CategoryUpsell'
      //   })

      //   if (upsellObj) {
      //     await store.dispatch('category_upsell/getUpsell', { id: upsellObj.CategoryUpsell_id })
      //   }
      // }
    }
  }
}
