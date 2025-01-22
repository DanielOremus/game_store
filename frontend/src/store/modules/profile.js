import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    profilesList: [],
    currentProfile: null,
  }),
  getters: {
    profile(state) {
      return state.currentProfile
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    setLoading(state, status) {
      state.isLoading = status
    },
    setProfile(state, profile) {
      const { role, ...data } = profile

      data.role = { id: role._id, title: role.title }
      state.currentProfile = data
    },
    clearProfile(state) {
      state.currentProfile = null
    },
  },
  actions: {
    async fetchProfileById({ commit, rootGetters }, userId) {
      console.log(userId)

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
      //Adding role if has perms
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

        //If current profile belongs to authenticated user

        const authUserId = rootGetters["auth/userId"]
        if (userId === authUserId) {
          dispatch(
            "auth/updateAuthData",
            { fullName: resData.data.user.fullName, id: userId },
            { root: true }
          )
        }
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
        await axios.post(apiEndpoints.user.generateEmailUpdateLink, payload, {
          withCredentials: true,
        })
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async updateUserEmail({ commit }, token) {
      try {
        const response = await axios.put(
          apiEndpoints.user.updateEmail,
          { token },
          { withCredentials: true }
        )
        const resData = response.data
        commit("setProfile", { email: resData.data.user.email })
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    clearProfile({ commit }) {
      commit("clearProfile")
    },
  },
}
