import CartPage from "@/views/CartPage.vue"

export default [
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
    meta: {
      pageCategory: "carts",
      pagePermission: "read",
      requiresAuth: true,
    },
  },
]
