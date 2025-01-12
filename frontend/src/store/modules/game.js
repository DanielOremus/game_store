import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"
export default {
  namespaced: true,
  state: () => ({
    /*homePageGames: {
      sales: [
      game1Obj,
      game2Obj
      ],
      category1: [
      ...
      ]
    }*/
    homePageGames: {},
    currentPageGames: [],
    perPage: 8,
    currentPage: 0,
    totalGamesCount: 0,
    isLoading: false,
    currentGame: null,
  }),
  getters: {
    currentPageGames(state) {
      return state.currentPageGames
    },
    homePageGames: (state) => (category) => state.homePageGames[category] || [],

    perPage(state) {
      return state.perPage
    },
    isLoading(state) {
      return state.isLoading
    },
    currentGame(state) {
      return state.currentGame
    },
  },
  mutations: {
    setHomePageGames(state, { category, list }) {
      state.homePageGames[category] = list
    },
    addGamesToCurrentPage(state, gamesList) {
      state.currentPageGames = [...state.currentPageGames, ...gamesList]
    },
    setTotalGamesCount(state, count) {
      state.totalGamesCount = count
    },
    setCurrentPage(state, pageNumber) {
      state.currentPage = pageNumber
    },
    resetPageGames(state) {
      state.currentPageGames = []
      state.currentPage = 0
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    updateCurrentGame(state, game) {
      state.currentGame = game ? { ...game } : null
    },
  },
  actions: {
    async fetchHomePageGames({ commit }, { category, query, limit }) {
      commit("setLoading", true)
      try {
        const response = await axios.get(apiEndpoints.game.fetchGames, {
          params: { ...query, perPage: limit },
        })
        const resData = response.data
        commit("setHomePageGames", { category, list: resData.data.games })
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async fetchGames({ commit }, payload = {}) {
      commit("setLoading", true)

      try {
        const response = await axios.get(apiEndpoints.game.fetchGames, {
          params: {
            ...payload,
          },
        })
        const resData = response.data
        const { count, games } = resData.data
        commit("addGamesToCurrentPage", games)
        commit("setTotalGamesCount", count)
      } catch (error) {
        console.log(error)
      } finally {
        commit("setLoading", false)
      }
    },
    async fetchGameById({ commit }, id) {
      commit("setLoading", true)

      try {
        const response = await axios.get(apiEndpoints.game.fetchGameById(id))
        const resData = response.data

        return resData.data.game
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    updateCurrentGame({ commit }, game) {
      commit("updateCurrentGame", game)
    },
    async createGame({ commit }, payload) {
      try {
        const response = await axios.post(apiEndpoints.game.create, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        const resData = response.data
        // commit("createGame", resData.data.game)
        return resData.data.game
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async updateGameById({ commit }, payload) {
      const { gameId, gameObj } = payload
      try {
        const response = await axios.put(
          apiEndpoints.game.updateGameById(gameId),
          gameObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        const resData = response.data
        // commit("updateGameById", resData.data.game)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async updateGallery({ commit }, payload) {
      const { mediaToDelete, mediaToAdd, gameId } = payload
      const formData = new FormData()

      formData.append("mediaToDelete", JSON.stringify(mediaToDelete))
      mediaToAdd.forEach((file) => formData.append("mediaToAdd", file))
      try {
        const response = await axios.put(
          apiEndpoints.game.updateGallery(gameId),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        const resData = response.data
        // commit("updateGameById", resData.data.game)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async deleteGameById({ commit }, gameId) {
      try {
        const response = await axios.delete(
          apiEndpoints.game.deleteGameById(gameId),
          { withCredentials: true }
        )
        const resData = response.data
      } catch (error) {}
    },
  },
}
