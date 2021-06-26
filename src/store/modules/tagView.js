/* import * as MutationTypes from '@/store/mutation-types'

import {
  flatArray,
} from '@/utils'

const state = {
  visitedViews: [],
}

const getters = {}

const mutations = {
  [MutationTypes.INIT_VISTED_VIEW](state, allRoutes) {
    const flatArr = flatArray(allRoutes)
    flatArr.forEach(item => {
      if (item.meta && item.meta.affix) {
        state.visitedViews.push({
          name: item.name,
          path: item.path,
          affix: true,
        })
      }
    })
  },
  [MutationTypes.ADD_VISTED_VIEW](state, view) {
    if (state.visitedViews.some(item => item.path === view.path)) return
    const obj = {
      name: view.name,
      path: view.path,
    }
    state.visitedViews.push(obj)
  },
  [MutationTypes.DEL_VISTED_VIEW](state, view) {
    state.visitedViews = state.visitedViews.filter(item => {
      return item.path !== view.path
    })
  },
}

const actions = {}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} */
