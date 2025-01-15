import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    roleList: [],
    isLoading: false,
  }),
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    roleList(state) {
      return state.roleList
    },
  },
  mutations: {
    setRoleList(state, list) {
      state.roleList = list
    },
    setLoading(state, status) {
      state.isLoading = status
    },
  },
  actions: {
    async fetchAllRoles({ commit }) {
      commit("setLoading", true)
      try {
        const response = await axios.get(apiEndpoints.role.fetchRoles, {
          withCredentials: true,
        })
        const resData = response.data
        commit("setRoleList", resData.data.roles)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
  },
}
