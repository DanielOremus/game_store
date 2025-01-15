import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null,
    isLoading: false,
    fullName: null,
  }),
  getters: {
    profile(state) {
      const { firstName, lastName, email, role, id, fullName } = state
      return { firstName, lastName, email, role, id, fullName }
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    setLoading(state, status) {
      state.isLoading = status
    },
    setProfile(state, payload) {
      const { role, ...data } = payload
      console.log(data)

      state.role = { id: role._id, title: role.title }
      for (const key in data) {
        state[key] = data[key]
      }
    },
  },
  actions: {
    async fetchProfileById({ commit, rootGetters }, userId) {
      userId = userId ?? rootGetters["auth/userId"]
      commit("setLoading", true)
      try {
        const response = await axios.get(
          apiEndpoints.user.fetchUserById(userId),
          { withCredentials: true }
        )
        const resData = response.data
        commit("setProfile", resData.data.user)
      } catch (error) {
        console.log(error)
      } finally {
        commit("setLoading", false)
      }
    },
    async updateUserPassword({ commit }, payload) {
      const { oldPassword, newPassword, userId } = payload
      try {
        const response = await axios.put(
          apiEndpoints.user.updateUserPassword(userId),
          { oldPassword, newPassword }
        )
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}
