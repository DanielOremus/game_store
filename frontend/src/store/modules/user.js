import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    usersList: [],
    isLoading: false,
    currentPage: 0,
    perPage: 15,
    totalUsersCount: 0,
  }),
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    usersList(state) {
      return state.usersList
    },
    pageData(state) {
      return { currentPage: state.currentPage, perPage: state.perPage }
    },
    totalUsersCount(state) {
      return state.totalUsersCount
    },
  },
  mutations: {
    setLoading(state, status) {
      state.isLoading = status
    },
    setCurrentUsers(state, list) {
      state.usersList = list
    },
    setTotalUsersCount(state, count) {
      state.totalUsersCount = count
    },
    pushToCurrentUsers(state, list) {
      state.usersList.push(...list)
    },
    deleteUserById(state, id) {
      const userIndex = state.usersList.findIndex((user) => user._id === id)
      if (userIndex > -1) {
        state.usersList.splice(userIndex, 1)
      }
    },
    setPageData(state, data) {
      state.currentPage = parseInt(data.currentPage)
      state.perPage = parseInt(data.perPage)
    },
    clearCurrentUsers(state) {
      state.usersList = []
      state.currentPage = 0
    },
  },
  actions: {
    async fetchUsers({ commit }, payload) {
      const { query, isNew } = payload
      if (isNew) commit("clearCurrentUsers")
      commit("setLoading", true)
      try {
        const response = await axios.get(apiEndpoints.user.fetchUsers, {
          params: query,
          withCredentials: true,
        })
        const resData = response.data
        commit("pushToCurrentUsers", resData.data.users)
        commit("setTotalUsersCount", resData.data.count)
        commit("setPageData", {
          currentPage: resData.data.currentPage,
          perPage: resData.data.perPage,
        })
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async deleteUserById({ commit }, userId) {
      try {
        await axios.delete(apiEndpoints.user.deleteUserById, {
          data: { id: userId },
          withCredentials: true,
        })
        commit("deleteUserById", userId)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}
