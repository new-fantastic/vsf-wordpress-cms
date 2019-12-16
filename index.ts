import { afterRegistration } from "./hooks/afterRegistration";
import {
  VueStorefrontModule,
  VueStorefrontModuleConfig
} from "@vue-storefront/core/lib/module";
import { ModulePrefix } from "@vue-wordpress/core";

import { config } from "@vue-wordpress/core/store/config";
import { menu } from "@vue-wordpress/core/store/menu";
import { meta } from "@vue-wordpress/core/store/meta";
import { post } from "@vue-wordpress/core/store/post";
import { module } from './store'

export const KEY = "wp_rest_content";

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration,
  store: {
    modules: [
      { key: `${ModulePrefix}_config`, module: config },
      { key: `${ModulePrefix}_menu`, module: menu },
      { key: `${ModulePrefix}_meta`, module: meta },
      { key: `${ModulePrefix}_post`, module: post },
      { key: `${ModulePrefix}_products`, module }
    ]
  }
};

export const WpJson = new VueStorefrontModule(moduleConfig);
