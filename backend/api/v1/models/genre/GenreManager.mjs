import MongooseManager from "../MongooseManager.mjs"
import Genre from "./Genre.mjs"

class GenreManager extends MongooseManager {}

export default new GenreManager(Genre)
