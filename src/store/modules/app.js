/* import * as MutationTypes from '@/store/mutation-types'
import {
  defaultRoutes,
  asyncRouteMap,
  filterAsyncRoutes
} from '@/router'
import {
  getUserRoles,
} from '@/api/app'

const state = {
  userInfo: null,
  roles: null, // 用户角色
  allRoutes: defaultRoutes,
  addRoutes: [],
  isCollapse: false, // 菜单栏是否折叠
};

const getters = {
  userInfo: state => state.userInfo,
  roles: state => state.roles,
  allRoutes: state => state.allRoutes, // 所有的
  addRoutes: state => state.addRoutes, // 匹配的
  isCollapse: state => state.isCollapse,
};

const mutations = {
  [MutationTypes.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [MutationTypes.SET_ROLES](state, roles) {
    state.roles = roles
  },
  [MutationTypes.SET_ROUTER](state, route) {
    state.addRoutes = route
    state.allRoutes = [...defaultRoutes, ...route]
  },
  [MutationTypes.TOGGLE_MENU_COLLAPSE](state) {
    state.isCollapse = !state.isCollapse
  },
}

const actions = {
  // 获取用户角色和用户信息
  async fetchRoles({ commit }) {
    try {
      const { code, data } = await getUserRoles()
      if (code === 0) {
        const roles = data.roles;
        const userInfo = data.userInfo;
        commit(MutationTypes.SET_ROLES, roles);
        commit(MutationTypes.SET_USER_INFO, userInfo)
        return Promise.resolve(data)
      }
    } catch (err) {
      return Promise.reject(err)
    }
  },
  generateRoutes({ commit }, roles) {
    let accessedRoutes = []
    if (roles.includes('admin')) {
      accessedRoutes = asyncRouteMap; // 如果是admin 直接加载所有路由 超级管理员
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRouteMap, roles) // 否则根据权限搜索路由
    }
    commit(MutationTypes.SET_ROUTER, accessedRoutes)
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} */
