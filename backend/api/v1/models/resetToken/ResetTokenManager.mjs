import MongooseManager from "../MongooseManager.mjs"
import ResetToken from "./ResetToken.mjs"

class ResetTokenManager extends MongooseManager {}

export default new ResetTokenManager(ResetToken)
