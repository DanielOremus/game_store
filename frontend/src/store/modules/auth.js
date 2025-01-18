import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"
export default {
  namespaced: true,
  state: () => ({
    userId: null,
    fullName: null,
    isAuthenticated: false,
  }),
  getters: {
    fullName(state) {
      return state.fullName
      // || localStorage.getItem("fullName")
    },
    isAuthenticated(state) {
      return state.isAuthenticated
    },
    userId(state) {
      return state.userId
    },
  },
  mutations: {
    setAuthData(state, data) {
      state.userId = data.id
      state.fullName = data.fullName
    },
    setAuthenticatedStatus(state, status) {
      state.isAuthenticated = status
    },
  },

  actions: {
    updateAuthData({ commit }, payload) {
      commit("setAuthData", payload)
    },
    async login({ commit, dispatch }, userData) {
      try {
        const response = await axios.post(apiEndpoints.auth.login, userData, {
          withCredentials: true,
        })
        const resData = response.data

        await dispatch("permissions/fetchPermissions", resData.data.user.id, {
          root: true,
        })

        commit("setAuthData", resData.data.user)
        commit("setAuthenticatedStatus", true)
      } catch (error) {
        console.log("Something went wrong")

        console.log(error)

        throw error
      }
    },
    async register({ commit, dispatch }, userData) {
      try {
        const response = await axios.post(apiEndpoints.auth.signup, userData, {
          withCredentials: true,
        })
        const resData = response.data

        await dispatch("permissions/fetchPermissions", resData.data.user.id, {
          root: true,
        })

        commit("setAuthData", resData.data.user)
        commit("setAuthenticatedStatus", true)
      } catch (error) {
        console.log("Something went wrong")

        console.log(error)

        throw error
      }
    },

    async logout({ commit, dispatch }) {
      try {
        await axios.post(
          apiEndpoints.auth.logout,
          {},
          { withCredentials: true }
        )

        commit("setAuthData", { id: null, fullName: null })
        commit("setAuthenticatedStatus", false)
        dispatch("permissions/fetchPermissions", null, { root: true })
      } catch (error) {
        console.log("Something went wrong")

        console.log(error)

        throw error
      }
    },
    async sendResetLink({ commit }, userEmail) {
      try {
        await axios.post(
          apiEndpoints.auth.generateResetToken,
          { email: userEmail },
          { withCredentials: true }
        )
      } catch (error) {
        console.log("Something went wrong")

        console.log(error)

        throw error
      }
    },
    async validateResetToken({ commit }, payload) {
      try {
        await axios.post(apiEndpoints.auth.validateResetToken, payload)
        return { isTokenValid: true }
      } catch (error) {
        return { isTokenValid: false, error }
      }
    },
    async resetPassword({ commit }, payload) {
      //const { token, newPassword, confirmPassword } = payload
      try {
        await axios.post(apiEndpoints.auth.resetPassword, payload)
        console.log("Password was successfully changed")
      } catch (error) {
        console.log("----err---")

        console.log(error)
        throw error
      }
    },
    async checkAuthStatus({ commit, dispatch }) {
      try {
        const response = await axios.get(apiEndpoints.auth.checkAuth, {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        })
        const resData = response.data
        if (resData.success) {
          commit("setAuthenticatedStatus", true)
          commit("setAuthData", {
            id: resData.data.id,
            fullName: resData.data.fullName,
          })
          dispatch("permissions/fetchPermissions", resData.data.id, {
            root: true,
          })
        } else {
          commit("setAuthenticatedStatus", false)
          commit("setAuthData", { id: null, fullName: null })
          dispatch("permissions/fetchPermissions", null, { root: true })
        }
      } catch (error) {
        console.log("Error while checking auth status")
        commit("setAuthenticatedStatus", false)
      }
    },
  },
}
