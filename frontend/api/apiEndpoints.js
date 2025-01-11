import config from "../config/default"
const API_URI = config.API_URI
export default Object.freeze({
  auth: {
    checkAuth: `${API_URI}/auth/check`,
    login: `${API_URI}/auth/login`,
    signup: `${API_URI}/auth/signup`,
    logout: `${API_URI}/auth/logout`,
    generateResetToken: `${API_URI}/auth/reset-password`,
    validateResetToken: (userId, token) =>
      `${API_URI}/auth/validate-token/${userId}/${token}`,
    resetPassword: (userId, token) =>
      `${API_URI}/auth/reset-password/${userId}/${token}`,
    getPermissions: (userId) =>
      userId
        ? `${API_URI}/auth/${userId}/get-permissions`
        : `${API_URI}/auth/get-guest-permissions`,
  },
  game: {
    fetchGames: `${API_URI}/games`,
    fetchGameById: (id) => `${API_URI}/games/${id}`,
    create: `${API_URI}/games/create`,
    updateGameById: (id) => `${API_URI}/games/update/${id}`,
    updateGallery: (id) => `${API_URI}/games/update-gallery/${id}`,
    deleteGameById: (id) => `${API_URI}/games/${id}`,
  },
  cart: {
    getDetails: (id) => `${API_URI}/carts/${id}`,
    addGame: `${API_URI}/carts/add-to-cart`,
    deleteGame: `${API_URI}/carts/delete-from-cart`,
    updateAmount: `${API_URI}/carts/update-game-amount`,
  },
  platform: {
    fetchPlatforms: `${API_URI}/platforms`,
  },
  genre: {
    fetchGenres: `${API_URI}/genres`,
  },
})
