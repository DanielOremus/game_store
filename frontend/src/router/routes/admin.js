import AdminPage from "@/views/admin/index.vue"
export default [
  {
    path: "/admin",
    name: "ControlPanel",
    component: AdminPage,
    //TODO: add authorization on page component
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/roles",
    name: "RolesPanel",
    component: () => import("@/views/admin/RolesPage.vue"),
    //TODO: add authorization on page component
    meta: {
      pageCategory: "roles",
      pagePermission: "read",
    },
  },
  {
    path: "/admin/users",
    name: "UsersPanel",
    component: () => import("@/views/admin/UsersPage.vue"),
    //TODO: add authorization on page component
    meta: {
      pageCategory: "users",
      pagePermission: "read",
    },
  },
]
