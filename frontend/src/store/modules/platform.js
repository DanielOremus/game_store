import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    platformList: [],
    headerPlatformList: [],
    isLoading: false,
  }),
  getters: {
    platforms(state) {
      return state.platformList
    },
    headerPlatforms(state) {
      return state.headerPlatformList
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    setPlatformList(state, list) {
      state.platformList = list
    },
    setHeaderPlatformList(state, list) {
      state.headerPlatformList = list
    },
    setLoading(state, status) {
      state.isLoading = status
    },
  },
  actions: {
    async fetchAllPlatforms({ commit }) {
      commit("setLoading", true)
      try {
        const response = await axios.get(
          apiEndpoints.platform.fetchAllPlatforms
        )
        const resData = response.data

        commit("setPlatformList", resData.data.platforms)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async fetchHeaderPlatforms({ commit }, payload) {
      commit("setLoading", true)
      try {
        const response = await axios.get(apiEndpoints.platform.fetchPlatforms, {
          params: payload,
        })
        const resData = response.data

        commit("setHeaderPlatformList", resData.data.platforms)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
  },
}
