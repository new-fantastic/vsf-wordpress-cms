import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import Vue from 'vue'

export const mutations: MutationTree<any> = {

  [types.SET_SLOT] (state, { slot, products }) {
    Vue.set(state.slots, slot, products)
  },

  [types.SET_CATEGORY] (state, { categoryId, products }) {
    Vue.set(state.categories, categoryId, products)
  },

  [types.PUSH_TO_SLOT] (state, { slot, products }) {
    Vue.set(state.slots, slot, {
      ...state.slots[slot],
      ...products
    })
  },

  [types.PUSH_TO_CATEGORY] (state, { categoryId, products }) {
    Vue.set(state.categories, categoryId, {
      ...state.categories[categoryId],
      ...products
    })
  }

}
