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
    async updateProfileById({ commit, rootGetters, dispatch }, payload) {
      const { firstName, lastName, roleId, userId } = payload
      console.log(roleId)

      const data = { firstName, lastName, userId }
      if (rootGetters["permissions/pagesPermissions"].users.update) {
        data.roleId = roleId
      }
      try {
        const response = await axios.put(
          apiEndpoints.user.updateProfile(userId),
          data,
          { withCredentials: true }
        )
        const resData = response.data
        commit("setProfile", resData.data.user)
        dispatch(
          "auth/updateAuthData",
          { fullName: resData.data.user.fullName, id: userId },
          { root: true }
        )
        console.log(response)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async updateUserPassword({ commit }, payload) {
      console.debug(payload)
      try {
        await axios.put(apiEndpoints.user.updateUserPassword, payload, {
          withCredentials: true,
        })
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async sendEmailUpdateLink({ commit }, payload) {
      console.debug("email link payload")
      console.debug(payload)
      try {
        const response = await axios.post(
          apiEndpoints.user.generateEmailUpdateLink,
          payload,
          { withCredentials: true }
        )
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}
