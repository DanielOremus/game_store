import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    platformList: [],
    isLoading: false,
  }),
  getters: {
    platforms(state) {
      return state.platformList
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    setPlatformList(state, list) {
      state.platformList = list
    },
    setLoading(state, status) {
      state.isLoading = status
    },
  },
  actions: {
    async fetchAllPlatforms({ commit }) {
      commit("setLoading", true)
      try {
        const response = await axios.get(apiEndpoints.platform.fetchPlatforms)
        const resData = response.data

        commit("setPlatformList", resData.data.platforms)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
  },
}
