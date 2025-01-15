import ProfilePage from "@/views/ProfilePage.vue"
export default [
  {
    path: "/profile",
    component: ProfilePage,
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
  },
]
