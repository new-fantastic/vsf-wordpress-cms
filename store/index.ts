import { Module } from 'vuex'
import { ProductsState } from '../types/ProductsState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state'

export const module: Module<ProductsState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
}
