import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    permissions: null,
  }),
  getters: {
    pagesPermissions(state) {
      const permissions = state.permissions
      //   || JSON.parse(localStorage.getItem("permissions"))
      // console.log(permissions)

      return permissions
    },
  },
  mutations: {
    setPermissions(state, data) {
      state.permissions = data.pagesPermissions
      // localStorage.setItem("permissions", JSON.stringify(data.pagesPermissions))
    },
    clearPermissions(state) {
      state.permissions = {}
      localStorage.removeItem("permissions")
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
    clearPermissions({ commit }) {
      commit("clearPermissions")
    },
  },
}
