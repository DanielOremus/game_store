import jwt from "jsonwebtoken"
import config from "../config/default.mjs"
class jwtHelper {
  static expiresIn = "24h"
  static prepareSecret(headers) {
    const secret = config.jwt.secret + headers["User-Agent"]
    console.log(secret)
    return secret
  }
  static prepareToken(headers, payload) {
    const secret = this.prepareSecret(headers)
    return jwt.sign(payload, secret, {
      expiresIn: this.expiresIn,
    })
  }
  static parseBearer(headers) {
    if (headers["authorization"]?.startsWith("Bearer ")) {
      const token = headers["authorization"].slice(7)
      const secret = this.prepareSecret(headers)

      try {
        return jwt.verify(token, secret)
      } catch (error) {
        throw new Error("Invalid token")
      }
    }
  }
}

export default jwtHelper
