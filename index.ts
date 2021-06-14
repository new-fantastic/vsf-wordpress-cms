import { afterRegistration } from "./hooks/afterRegistration";
import {
  VueStorefrontModule,
  VueStorefrontModuleConfig
} from "@vue-storefront/core/lib/module";

import { createModule } from '@vue-storefront/core/lib/module'
import { ModulePrefix } from "@vue-wordpress/core";
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { module } from './store'
import { menu } from "@vue-wordpress/core/store/menu";
import { meta } from "@vue-wordpress/core/store/meta";
import { post } from "@vue-wordpress/core/store/post";
import { config } from "@vue-wordpress/core/store/config";


export const KEY = "wp_rest_content";

export const WpJson: StorefrontModule = function ({ store, appConfig }) {
  store.registerModule(`${ModulePrefix}_config`, config)
  store.registerModule(`${ModulePrefix}_menu`, menu)
  store.registerModule(`${ModulePrefix}_meta`, meta)
  store.registerModule(`${ModulePrefix}_post`, post)
  store.registerModule(`${ModulePrefix}_products`, module)

  afterRegistration(appConfig, store)
}
