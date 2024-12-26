import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    permissions: {},
  }),
  getters: {
    pagePermissions(state) {
      return state.permissions
    },
  },
  mutations: {
    setPermissions(state, data) {
      console.log(data.pagesPermissions)

      state.permissions = data.pagesPermissions
    },
    clearPermissions(state) {
      state.permissions = {}
    },
  },
  actions: {
    async fetchPermissions({ commit }, userId) {
      try {
        const response = await axios.get(
          apiEndpoints.auth.getPermissions(userId),
          {
            withCredentials: true,
          }
        )
        const resData = response.data
        if (!resData.success) {
          return
        }
        commit("setPermissions", resData.data)
      } catch (error) {
        console.log("Something went wrong")
        console.log(error)
      }
    },
  },
}
