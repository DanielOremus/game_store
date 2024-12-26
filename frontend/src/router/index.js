import { createRouter, createWebHistory } from "vue-router"
import authRoutes from "./routes/auth"
import HomePage from "@/views/HomePage.vue"
import store from "@/store"

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
    const isAuthenticated = () => store.getters["auth/isAuthenticated"]
    if (!isAuthenticated()) {
      try {
        await store.dispatch("auth/checkAuth")
      } catch (error) {
        console.log("Error while checking auth status", error)
      }

      if (isAuthenticated()) next()
      else next({ name: "Login" })
    }
  } else {
    next()
  }
})

export default router
