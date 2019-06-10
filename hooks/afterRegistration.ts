import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'

import WpJson from '@vue-wordpress/core'
import * as vuex from '@vue-wordpress/core/plugin/initializers/store'
// import registerPlugin from '@vue-wordpress/core/plugin/registerPlugin'

export function afterRegistration ({ Vue, store, isServer }) {

  const tmpCfg: any = {
    config: {
      url: 'https://test.wp.newfantastic.com/',
      lang: 'pl'
    },
    store,
    router: false
  }

  AsyncDataLoader.push({
    execute: async ({ route }) => {
      // const lang = getLangByRoute(route)

      // vuex.registerModules(store)
      Vue.use(WpJson, tmpCfg)

      // HERE WILL BE PRODUCTS

      // await vuex.loadBase(store.dispatch, 'menus' in tmpCfg.config ? tmpCfg.config.menus : {}) // menus
      // vuex.setLang(store.commit, tmpCfg.config.lang) 
      // vuex.setConfig(store.commit, {
      //   ...tmpCfg.config,
      //   asyncData: true
      // }) 

      // store.commit(`wp_rest_content/${SET_LANG}`, lang)
      
      // They'll be loaded in parallel
      // await store.dispatch('wp_rest_content/loadMenu', {
      //   menuSlugs: config.wordpressCms.menus,
      //   lang
      // })

      // await store.dispatch('wp_rest_content/loadMeta', {
      //   lang
      // })

      // await store.dispatch('wpr_media/loadMedia', {
      //   lang
      // })
    }
  })
}
