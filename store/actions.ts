import { router } from '@vue-storefront/core/app'
import axios from 'axios'
import { WPRState } from '../types'
import { ActionTree } from 'vuex';
import config from 'config'

import * as types from './mutation-types'
import { ContentTypes } from '../types'
import { type } from 'os';

const typeBaseUrl = {
  [ContentTypes.Page]: '/wp-json/wp/v2/pages?slug=',
  [ContentTypes.Post]: '/wp-json/wp/v2/posts?slug=',
  [ContentTypes.Menu]: '/wp-json/menus/v1/menus'
}

const typeBaseMutation = {
  [ContentTypes.Page]: types.SET_PAGE_CONTENT,
  [ContentTypes.Post]: types.SET_POST_CONTENT,
  [ContentTypes.Menu]: types.SET_MENU_CONTENT
}

export const actions = {
  async loadContent ({state, commit}, {slug, type, lang}) {

    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = config.wordpressCms.url + part + typeBaseUrl[type]

    try {
      const response = await axios.get(baseUrl + slug)

      if(response.data.status == 404 || response.data.length < 1) {
        throw new Error('Endpoint ain\'t ready')
      }
    
      commit(typeBaseMutation[type], {
        data: response.data,
        slotName: slug
      })
  
    } catch (err) {
        // router.push('/page-not-found')
    }
  },

  async loadMenu({state, commit}, {menuSlugs, lang}) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = config.wordpressCms.url + part + typeBaseUrl[ContentTypes.Menu]

    const fixUrls = items => {
      const fixedItems = []

      for(let item of items) {
        fixedItems.push({
          ...item,
          url: item.url.replace(config.wordpressCms.url, k => {
            return config.wordpressCms.url.substr(-1) === '/'
              ? '/info/'
              : 'info/'
          })
        })
      }

      return fixedItems
    }

    try {
      if(Array.isArray(menuSlugs)) {
        // Few menus in paralel
        const requests = []
        for(let slug of menuSlugs) {
          requests.push(
            axios.get(baseUrl + '/' + slug)
          )
        }
        let response = await Promise.all(requests)
        response.forEach(c => {
          commit(typeBaseMutation[ContentTypes.Menu], {
            data: {
              ...c.data,
              items: fixUrls(c.data.items)
            },
            slotName: c.data.slug
          })
        })

      } else {
        let response = await axios.get(baseUrl + '/' + menuSlugs)
        commit(typeBaseMutation[ContentTypes.Menu], {
          data: response.data,
          slotName: menuSlugs
        })
      }
      // if(response.data.status == 404 || response.data.length < 1) {
      //   throw new Error('Endpoint ain\'t ready')
      //    
  
    } catch (err) {
      console.log('TU', err)
    }
  }

}
