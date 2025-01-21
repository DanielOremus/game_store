import ProfilePage from "@/views/profile/ProfilePage.vue"
import ConfirmEmailUpdate from "@/views/profile/ConfirmEmailUpdate.vue"
export default [
  {
    path: "/profile",
    component: ProfilePage,
    name: "OwnProfile",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile/:id",
    component: ProfilePage,
    name: "UserProfile",
    meta: {
      pageCategory: "users",
      pagePermission: "read",
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
