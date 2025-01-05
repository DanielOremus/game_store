import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    genreList: [],
  }),
  getters: {
    genres(state) {
      return state.genreList
    },
  },
  mutations: {
    setGenreList(state, list) {
      state.genreList = list
    },
  },
  actions: {
    async fetchAllGenres({ commit }) {
      try {
        const response = await axios.get(apiEndpoints.genre.fetchGenres)
        const resData = response.data

        commit("setGenreList", resData.data.genres)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}
