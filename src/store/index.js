import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存储当前登录用户信息（token等数据）
    // user: null
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新丢失，需要把数据存储到本地
      setItem(TOKEN_KEY, state.user)
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
