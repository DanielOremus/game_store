import AuthPage from "@/views/AuthPage.vue"
import EntryWrapper from "@/components/auth/entry/index.vue"
import LoginForm from "@/components/auth/entry/LoginForm.vue"
import RegisterForm from "@/components/auth/entry/RegisterForm.vue"
import ResetWrapper from "@/components/auth/reset_password/index.vue"
import EmailForm from "@/components/auth/reset_password/EmailForm.vue"
import PasswordForm from "@/components/auth/reset_password/PasswordForm.vue"
export default [
  {
    path: "/auth",
    component: AuthPage,
    redirect: { name: "Login" },
    children: [
      {
        path: "login",
        name: "Login",
        component: EntryWrapper,
        alias: "/login",
        meta: {
          pageTitle: "Login",
          subComponent: LoginForm,
        },
      },
      {
        path: "signup",
        name: "Register",
        component: EntryWrapper,
        alias: "/signup",
        meta: {
          pageTitle: "Signup",
          subComponent: RegisterForm,
        },
      },
      {
        path: "reset-password",
        name: "ResetPassword",
        component: ResetWrapper,
        meta: {
          pageTitle: "Reset Password",
          subComponent: EmailForm,
        },
      },
      {
        path: "reset-password/:userId/:token",
        name: "ResetPasswordLink",
        component: ResetWrapper,
        props: true,
        meta: {
          pageTitle: "Reset Password",
          subComponent: PasswordForm,
        },
      },
    ],
  },
]
