import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    genreList: [],
    isLoading: false,
  }),
  getters: {
    genres(state) {
      return state.genreList
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    setGenreList(state, list) {
      state.genreList = list
    },
    setLoading(state, status) {
      state.isLoading = status
    },
  },
  actions: {
    async fetchAllGenres({ commit }) {
      commit("setLoading", true)
      try {
        const response = await axios.get(apiEndpoints.genre.fetchGenres)
        const resData = response.data

        commit("setGenreList", resData.data.genres)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
  },
}
