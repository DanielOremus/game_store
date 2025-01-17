import ProfilePage from "@/views/profile/ProfilePage.vue"
import ConfirmEmailUpdate from "@/views/profile/ConfirmEmailUpdate.vue"
export default [
  {
    path: "/profile",
    component: ProfilePage,
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile/email-update/:token",
    component: ConfirmEmailUpdate,
    name: "ConfirmEmailUpdate",
    meta: {
      requiresAuth: true,
    },
  },
]
