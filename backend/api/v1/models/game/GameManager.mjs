import MongooseManager from "../MongooseManager.mjs"
import Game from "./Game.mjs"

class GameManager extends MongooseManager {}

export default new GameManager(Game)
