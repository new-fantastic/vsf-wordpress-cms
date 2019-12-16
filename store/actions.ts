import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';
import { ProductsState } from '../types/ProductsState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { baseFilterProductsQuery } from '@vue-storefront/core/helpers';
import config from 'config'

export const actions: ActionTree<ProductsState, any> = {
  
  /**
   * 
   * @param {Number} categoryId - ID of category of products to fetch
   * @param {Number} start? - From which position should it start
   * @param {Number} size? - How many products fetch (max)
   * @param {String} sort? - Sort by
   * @param {Array<String>} excludeFields? - Fields to exclude
   * @param {Array<String>} includeFields? - Fields to include
   * @param {Function(product): product} beforeSave? - Function that maps each product
   * @param {Boolean} shouldSave? - Whether should it be saved to vuex or not
   * @param {Boolean} shouldReturn? - Whether should it be returned or not
   * 
   */

  async fetchByCategory ({ commit }, {
    categoryId = 2,
    start = 0,
    size = 50,
    sort = '',
    excludeFields = null,
    includeFields = config.wordpressCms.includeFields,
    beforeSave = null,
    shouldSave = true,
    shouldReturn = false
  }) {
    const query = baseFilterProductsQuery({
      id: categoryId
    })
    const { storeCode } = currentStoreView()

    try {
      let products: any = await quickSearchByQuery({
        query,
        start,
        size,
        entityType: 'product',
        sort,
        storeCode: storeCode ? storeCode : null,
        excludeFields,
        includeFields
      })

      if (beforeSave && typeof beforeSave === 'function') {
        products = products.items.map(item => beforeSave(item))
      }

      if (shouldSave) {
        commit(types.SET_CATEGORY, { categoryId, products: products.items })
      }

      if (shouldReturn) {
        return products
      }
    } catch (err) {
      console.log('[VueWordpress] Could not fetch products from category ' + categoryId)
    }

    return false
  },

  /**
   * 
   * @param {Bodybuilder/SearchQuery} query - Query that will be send to elasticsearch
   * @param {String} slotName - slotName to be saved in
   * @param {Number} start? - From which position should it start
   * @param {Number} size? - How many products fetch (max)
   * @param {String} sort? - Sort by
   * @param {Array<String>} excludeFields? - Fields to exclude
   * @param {Array<String>} includeFields? - Fields to include
   * @param {Function(product): product} beforeSave? - Function that maps each product
   * @param {Boolean} shouldSave? - Whether should it be saved to vuex or not
   * @param {Boolean} shouldReturn? - Whether should it be returned or not
   * 
   */
  
  async fetchByQuery ({ commit }, {
    query,
    slotName,
    start = 0,
    size = 50,
    sort = '',
    excludeFields = null,
    includeFields = config.wordpressCms.includeFields,
    beforeSave = null,
    shouldSave = true,
    shouldReturn = false
  }) {
    const { storeCode } = currentStoreView()

    try {
      let products: any = await quickSearchByQuery({
        query,
        start,
        size,
        entityType: 'product',
        sort,
        storeCode: storeCode ? storeCode : null,
        excludeFields,
        includeFields
      })

      if (beforeSave && typeof beforeSave === 'function') {
        products = products.items.map(item => beforeSave(item))
      }

      if (shouldSave) {
        commit(types.SET_SLOT, { slot: slotName, products: products.items })
      }

      if (shouldReturn) {
        return products
      }
    } catch (err) {
      console.log('[VueWordpress] Could not fetch products with ' + query)
    }

    return false
  },

  /**
   * 
   * @param {Array<String>} childSkus - Skus of childs
   * @param {String} slotName - slotName to be saved in
   * @param {Boolean} cutOtherColors? - Remove other colors from state?
   * @param {Number} start? - From which position should it start
   * @param {Number} size? - How many products fetch (max)
   * @param {String} sort? - Sort by
   * @param {Array<String>} excludeFields? - Fields to exclude
   * @param {Array<String>} includeFields? - Fields to include
   * @param {Function(product): product} beforeSave? - Function that maps each product
   * @param {Boolean} shouldSave? - Whether should it be saved to vuex or not
   * @param {Boolean} shouldReturn? - Whether should it be returned or not
   * 
   */

  async fetchBySkus ({ commit }, {
    childSkus,
    slotName,
    cutOtherColors = true,
    start = 0,
    size = 50,
    sort = '',
    excludeFields = null,
    includeFields = config.wordpressCms.includeFields,
    beforeSave = null,
    shouldSave = true,
    shouldReturn = false
  }) {
    const query = baseFilterProductsQuery({
      id: 2
    }).applyFilter({key: 'configurable_children.sku', value: {'in': childSkus}})

    const { storeCode } = currentStoreView()

    try {
      let parents: any = await quickSearchByQuery({
        query,
        start,
        size,
        entityType: 'product',
        sort,
        storeCode: storeCode ? storeCode : null,
        excludeFields,
        includeFields
      })

      let matchedProducts = childSkus.map(child => {
        let parent = parents.items.find(parent =>
          parent.configurable_children
            .some(children => children.sku === child && +parent.clone_color_id === children.color)
        )

        if (!parent) {
          console.log('[VueWordpress] Could not find product with SKU', child)
          return null
        }

        if (!cutOtherColors) {
          return parent
        }
        parent.configurable_children = parent.configurable_children.filter(children => children.color === +parent.clone_color_id)
        return parent
      }).filter(v => !!v)

      if (beforeSave && typeof beforeSave === 'function') {
        matchedProducts = matchedProducts.map(item => beforeSave(item))
      }

      if (shouldSave) {
        commit(types.SET_SLOT, { slot: slotName, products: matchedProducts })
      }

      if (shouldReturn) {
        return matchedProducts
      }
    } catch (err) {
      console.log('[VueWordpress] Could not fetch products from category ' + query)
    }

    return false
  }

}
