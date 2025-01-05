import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    platformList: [],
  }),
  getters: {
    platforms(state) {
      return state.platformList
    },
  },
  mutations: {
    setPlatformList(state, list) {
      state.platformList = list
    },
  },
  actions: {
    async fetchAllPlatforms({ commit }) {
      try {
        const response = await axios.get(apiEndpoints.platform.fetchPlatforms)
        const resData = response.data

        commit("setPlatformList", resData.data.platforms)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}
