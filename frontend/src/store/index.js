import { createStore } from "vuex"
import authModule from "./modules/auth.js"
import profileModule from "./modules/profile.js"
import permissionsModule from "./modules/permissions.js"
import gameModule from "./modules/game.js"
import platformModule from "./modules/platform.js"
import genreModule from "./modules/genre.js"
import cartModule from "./modules/cart.js"
import roleModule from "./modules/role.js"

const store = createStore({
  modules: {
    auth: authModule,
    profile: profileModule,
    permissions: permissionsModule,
    game: gameModule,
    platform: platformModule,
    genre: genreModule,
    cart: cartModule,
    role: roleModule,
  },
})

export default store
