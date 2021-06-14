import { Module } from 'vuex'
import { ProductsState } from '../types/ProductsState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state'
import RootState from '@vue-storefront/core/types/RootState'

export const module: Module<ProductsState, RootState> = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
}
