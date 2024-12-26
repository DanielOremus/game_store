import { createRouter, createWebHistory } from "vue-router"
import authRoutes from "./routes/auth"
import HomePage from "@/views/HomePage.vue"
import store from "@/store"
const isAuthenticated = () => store.getters["auth/isAuthenticated"]

const routes = [
  {
    path: "/",
    name: "HomePage",
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const title = to.meta.pageTitle
  document.title = title

  if (to.meta.requiresAuth) {
    if (isAuthenticated()) return next()
    await store.dispatch("auth/checkAuthStatus")

    return isAuthenticated() ? next() : next({ name: "Login" })
  }
  if (to.meta.requiresNotAuth) {
    await store.dispatch("auth/checkAuthStatus")
    if (!isAuthenticated()) return next()
    return next({ name: "HomePage" })
  }

  next()
})

export default router
