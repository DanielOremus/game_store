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
    },
    isAuthenticated(state) {
      return state.isAuthenticated
    },
  },
  mutations: {
    setAuthData(state, data) {
      state.userId = data.id
      state.fullName = data.fullName
      localStorage.setItem("userId", data.id)
      localStorage.setItem("fullName", data.fullName)
    },
    setAuthenticatedStatus(state, status) {
      state.isAuthenticated = status
      if (status) localStorage.setItem("isAuthenticated", true)
      else localStorage.setItem("isAuthenticated", false)
    },
  },

  actions: {
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

    async logout({ commit }) {
      try {
        await axios.post(
          apiEndpoints.auth.logout,
          {},
          { withCredentials: true }
        )

        commit("setAuthData", { id: null, fullName: null })
        commit("setAuthenticatedStatus", false)
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
      console.log(payload)
      const { userId, token } = payload
      try {
        await axios.get(apiEndpoints.auth.validateResetToken(userId, token))
        return { isTokenValid: true }
      } catch (error) {
        return { isTokenValid: false, error }
      }
    },
    async resetPassword({ commit }, payload) {
      const { userId, token, newPassword, confirmPassword } = payload
      try {
        await axios.post(apiEndpoints.auth.resetPassword(userId, token), {
          newPassword,
          confirmPassword,
        })
        console.log("Password was successfully changed")
      } catch (error) {
        console.log("----err---")

        console.log(error)
        throw error
      }
    },
    // async checkAuth({ commit }) {
    //   const localAuthStatus = localStorage.getItem("isAuthenticated")

    //   try {
    //     if (localAuthStatus) {
    //       const response = await axios.get(apiEndpoints.auth.checkAuth, {
    //         withCredentials: true,
    //         validateStatus: (status) => status < 500,
    //       })
    //       const resData = response.data
    //       if (resData.success) {
    //         commit("setAuthenticatedStatus", true)
    //       } else {
    //         commit("setAuthenticatedStatus", false)
    //       }
    //     } else {
    //       commit("setAuthenticatedStatus", false)
    //     }
    //   } catch (error) {
    //     console.log("Error while checking auth status")
    //     commit("setAuthenticatedStatus", false)
    //   }
    // },
  },
}
