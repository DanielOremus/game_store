import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    pagesPermissions: null,
  }),
  getters: {
    pagesPermissions(state) {
      return state.pagesPermissions
    },
  },
  mutations: {
    setPagesPermissions(state, list) {
      state.pagesPermissions = list
    },
  },
  actions: {
    async fetchUserPermissions({ commit }, userId) {
      try {
        const response = await axios.get(
          apiEndpoints.role.fetchRoleByUserId(userId),
          {
            withCredentials: true,
          }
        )
        const resData = response.data
        commit("setPagesPermissions", resData.data.role.pagesPermissions)
      } catch (error) {
        console.log("Something went wrong")
        console.log(error)
      }
    },
  },
}
