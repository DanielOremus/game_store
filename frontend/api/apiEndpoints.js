const API_BASE = import.meta.env.VITE_API_BASE

export default Object.freeze({
  auth: {
    checkAuth: `${API_BASE}/auth/check`,
    login: `${API_BASE}/auth/login`,
    signup: `${API_BASE}/auth/signup`,
    logout: `${API_BASE}/auth/logout`,
    generateResetToken: `${API_BASE}/auth/reset-password`,
    validateResetToken: (userId, token) =>
      `${API_BASE}/auth/validate-token/${userId}/${token}`,
    resetPassword: (userId, token) =>
      `${API_BASE}/auth/reset-password/${userId}/${token}`,
    getPermissions: (userId) => `${API_BASE}/auth/${userId}/get-permissions`,
  },
})
