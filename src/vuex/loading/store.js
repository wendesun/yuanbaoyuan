import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: false
}

const mutations = {
    SET_LOADING_STATUS (state, value) {
        state.loading = value
    }
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true
})
