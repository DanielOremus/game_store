export const logoutAsync = (req) => {
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
export const destroySession = (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
export const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
export const authenticateLocal = (req) => {}
