import { once } from '@vue-storefront/core/helpers';
import config from 'config';
import VueWordpress from '@vue-wordpress/core';
import * as vuex from '@vue-wordpress/core/plugin/initializers/store';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'

export async function afterRegistration({ Vue, store, isServer }) {

    const isProd = process.env.NODE_ENV === 'production'

    const tmpCfg: any = {
      ...config.wordpressCms,
      debugger: !isProd,
      store: true
    };

    const { storeCode } = currentStoreView();
    if (tmpCfg[`url_${storeCode}`]) {
      tmpCfg.url = tmpCfg[`url_${storeCode}`]
    }

    vuex.setConfig(store.commit, {
      ...tmpCfg,
      asyncData: true
    });

    AsyncDataLoader.push({
      async execute ({ route, store, context }) {
        await vuex.loadBase(store.dispatch, true);
        if (isServer) {
          Vue.prototype.$cacheTags.add('wp:menu')
          const menus = Object.values(store.state.wp_menu.menu)
          for (let menu of menus) {
            // Vue.prototype.$cacheTags.add(`menu-${slug}`)
            Vue.prototype.$cacheTags.add(`wp:menu:${(<any>menu).term_id}`)
          }
        }
      }
    })

    once('__VUE_WP', async () => {
      Vue.use(VueWordpress, tmpCfg);
    })
    
}
