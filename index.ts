// import { module } from './store'
// import { mediaModule } from './store/media'
import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { preparedRoutes } from './router/routes'
import { ModulePrefix } from '@vue-wordpress/core'

// import { config } from '@vue-wordpress/core/'

export const KEY = 'wp_rest_content'
// export const MEDIA_KEY = 'wpr_media'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration,
  router: { 
    routes: <any>preparedRoutes
  }//,
  // store: { modules: [
  //   { key: `${ModulePrefix}_config`, module:  }
  // ] },
}

export const WpJson = new VueStorefrontModule(moduleConfig)
