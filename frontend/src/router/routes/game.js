export default [
  {
    path: "/games/search",
    name: "GamesList",
    component: () => import("@/views/game/ListPage.vue"),
    meta: {
      pageCategory: "games",
      pagePermission: "read",
    },
  },
  {
    path: "/games/:id",
    name: "SpecificGame",
    component: () => import("@/views/game/SpecificPage.vue"),
    meta: {
      pageCategory: "games",
      pagePermission: "read",
    },
  },
  {
    path: "/games/:id/update",
    name: "UpdateGame",
    component: () => import("@/views/game/FormPage.vue"),
    meta: {
      pageCategory: "games",
      pagePermission: "update",
    },
  },
  {
    path: "/games/:id/update-gallery",
    name: "UpdateGallery",
    component: () => import("@/views/game/GalleryPage.vue"),
    meta: {
      pageCategory: "games",
      pagePermission: "update",
    },
  },
  {
    path: "/games/create",
    name: "CreateGame",
    component: () => import("@/views/game/FormPage.vue"),
    meta: {
      pageCategory: "games",
      pagePermission: "create",
    },
  },
]
