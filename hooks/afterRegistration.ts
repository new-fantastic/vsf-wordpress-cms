import { AsyncDataLoader } from "@vue-storefront/core/lib/async-data-loader";
import config from "config";
import WpJson from "@vue-wordpress/core";
import * as vuex from "@vue-wordpress/core/plugin/initializers/store";
import * as types from "@vue-wordpress/core/store/config/mutation-types";
import { currentStoreView } from "@vue-storefront/core/lib/multistore";

export function afterRegistration({ Vue, store, isServer }) {
  const tmpCfg: any = {
    ...config.wordpressCms,
    store: true,
    router: true
  };

  if ("plugins" in config.wordpressCms) {
    tmpCfg.plugins = config.wordpressCms.plugins;
  }
  Vue.use(WpJson, tmpCfg);

  AsyncDataLoader.push({
    execute: async ({ route }) => {
      const { storeCode } = currentStoreView();
      if (storeCode && storeCode.length > 0 && storeCode !== "pl") {
        vuex.setConfig(store.commit, {
          ...tmpCfg,
          requestPrefix: storeCode,
          asyncData: true
        });
        Vue.prototype.$wp.requestPrefix = storeCode;
      } else {
      }

      // HERE WILL BE PRODUCTS

      await vuex.loadBase(store.dispatch, true); // menus
      vuex.setConfig(store.commit, {
        ...tmpCfg,
        asyncData: true
      });
    }
  });
}
