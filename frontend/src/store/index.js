import { createStore } from "vuex"
import authModule from "./modules/auth.js"
import profileModule from "./modules/profile.js"
import permissionsModule from "./modules/permissions.js"
const store = createStore({
  modules: {
    auth: authModule,
    profile: profileModule,
    permissions: permissionsModule,
  },
})

export default store
