<template>
  <div
    v-if="wpData !== null"
    class="page"
    :key="wpData.id"
  >
    <div
      class="page__heading margin__y--sm"
    >
      <div
        class="page__breadcrumbs"
      >
        <!-- <breadcrumbs
          :routes="breadcrumbs.routes"
          :active-route="wpData.title.rendered"
        /> -->
      </div>
      <h1
        class="page__title"
        :class="{
          'text-align__left' : wpData.acf.page_options.page_title.alignment === 'left',
          'text-align__center' : wpData.acf.page_options.page_title.alignment === 'center',
          'text-align__right' : wpData.acf.page_options.page_title.alignment === 'right'
        }"
        v-if="wpData.acf.page_options.page_title.visibility === true"
        v-html="wpData.title.rendered"
      />
    </div>
    <div
      class="page__content"
    >
      <Sections
        v-if="wpData"
        :data="wpData"
      />
      <p
        v-else
      >
        {{ $t('Not found') }}
      </p>
    </div>
  </div>
</template>

<script>
import rootStore from "@vue-storefront/store";
import config from 'config'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import { getLangByRoute } from '../util/GetLang'
import { ContentTypes } from '../types'

export default {
  components: {
    Sections: () => import("../components/TheRoot.js"),
    Breadcrumbs
  },

  data () {
    return {
      breadcrumbs: {
        routes: [
          { name: 'Home', route_link: '/' }
        ]
      }
    }
  },

  computed: {
    categories() {
      return this.getCategories;
    },
    wpData () {
      const lang = getLangByRoute(this.$route)
      const langComponentName = (this.$route.name).replace(`${lang !== 'pl' ? rootStore.state.storeView.url.substr(1) + '-' : ''}`, '')
    
      return this.$store.state.wp_rest_content.pages[this.$route.params.slug]
    }
  },
  metaInfo() {
    // const headWpData = this.wpData()
    return {
      title: this.wpData.title.rendered,
      meta: [
        {
          name: "description",
          vmid: "description",
          content: this.wpData.acf.meta_description
        }
      ]
    };
  },
  watch: {
    async $route(to) {
      await this.$store.dispatch("wp_rest_content/loadContent", {
        slug: to.params.slug,
        lang: getLangByRoute(to),
        type: ContentTypes.Page
      });
    }
  },
  async asyncData({ store, route }) {
    const config = store.state.config;
    const lang = getLangByRoute(route)

    await store.dispatch("wp_rest_content/loadContent", {
      slug: route.params.slug,
      lang,
      type: ContentTypes.Page
    });

    await store.dispatch("category/list", {
      includeFields: config.entities.optimize
        ? config.entities.category.includeFields
        : null
    });
  }
};
</script>
