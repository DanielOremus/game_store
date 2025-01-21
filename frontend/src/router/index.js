import { createRouter, createWebHistory } from "vue-router"
import authRoutes from "./routes/auth"
import gameRoutes from "./routes/game"
import cartRoutes from "./routes/cart"
import profileRoutes from "./routes/profile"
import adminRoutes from "./routes/admin"
import HomePage from "@/views/HomePage.vue"
import store from "@/store"

const isAuthenticated = () => store.getters["auth/isAuthenticated"]

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { pageTitle: "GameStore" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      pageTitle: "Oops!",
    },
  },
  ...authRoutes,
  ...gameRoutes,
  ...cartRoutes,
  ...profileRoutes,
  ...adminRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const title = to.meta.pageTitle || "GameStore"
  document.title = title

  if (to.meta.requiresAuth) {
    if (isAuthenticated()) return true
    return router.push({ name: "Login" })
  }
  if (to.meta.requiresNotAuth) {
    if (!isAuthenticated()) return true
    return router.push({ name: "Home" })
  }

  const pagesPermissions = store.getters["permissions/pagesPermissions"]

  if (
    pagesPermissions?.[to.meta.pageCategory]?.[to.meta.pagePermission] === false
  ) {
    return router.push({ name: "NotFound" })
  }
})

export default router
