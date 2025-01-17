import apiEndpoints from "../../../api/apiEndpoints"
import axios from "axios"
export default {
  namespaced: true,
  state: () => ({
    cart: null,
    isLoading: false,
  }),
  getters: {
    cart(state) {
      return state.cart
    },
    totalSalePrice(state) {
      const result = state.cart?.games?.reduce(
        (acc, item) => acc + parseFloat(item.game.sale_price) * item.amount,
        0
      )
      return parseFloat(result?.toFixed(2))
    },
    totalPrice(state) {
      const result = state.cart?.games?.reduce(
        (acc, item) => acc + item.game.price * item.amount,
        0
      )
      return parseFloat(result?.toFixed(2))
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    deleteGameById(state, gameId) {
      const gameIndex = state.cart.games.findIndex(
        (item) => item.game._id === gameId
      )
      console.log(state.cart.games)

      if (gameIndex > -1) {
        state.cart.games.splice(gameIndex, 1)
      }
    },
    updateAmountByGameId(state, payload) {
      const { gameId, amount } = payload
      const gameIndex = state.cart.games.findIndex(
        (item) => item.game._id === gameId
      )
      if (gameIndex > -1) {
        state.cart.games[gameIndex].amount = amount
      }
    },
  },
  actions: {
    async fetchCartData({ commit, rootGetters }, userId) {
      commit("setLoading", true)
      if (!userId) userId = rootGetters["auth/userId"]
      try {
        console.log(userId)

        const response = await axios.get(apiEndpoints.cart.getDetails(userId), {
          withCredentials: true,
        })
        const resData = response.data
        commit("setCart", resData.data.cart)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async addGameToCart({ commit, rootGetters }, payload) {
      if (!payload.userId) payload.userId = rootGetters["auth/userId"]
      try {
        const response = await axios.post(apiEndpoints.cart.addGame, payload, {
          withCredentials: true,
        })
        const resData = response.data
        commit("setCart", resData.data.cart)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async updateGameAmount({ commit, rootGetters }, payload) {
      if (!payload.userId) payload.userId = rootGetters["auth/userId"]
      try {
        const response = await axios.put(
          apiEndpoints.cart.updateAmount,
          payload,
          {
            withCredentials: true,
          }
        )
        commit("updateAmountByGameId", {
          gameId: payload.gameId,
          amount: payload.amount,
        })
      } catch (error) {}
    },
    async deleteGameFromCart({ commit, rootGetters }, payload) {
      if (!payload.userId) payload.userId = rootGetters["auth/userId"]
      try {
        const response = await axios.delete(apiEndpoints.cart.deleteGame, {
          data: payload,
          withCredentials: true,
        })
        commit("deleteGameById", payload.gameId)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}
