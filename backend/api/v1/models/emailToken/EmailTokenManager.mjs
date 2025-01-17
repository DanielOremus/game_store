import MongooseManager from "../MongooseManager.mjs"
import EmailToken from "./EmailToken.mjs"
class EmailTokenManager extends MongooseManager {}

export default new EmailTokenManager(EmailToken)
