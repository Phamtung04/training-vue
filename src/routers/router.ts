import Authentication from '../layout/auth/authentication.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterContainer from '../pages/authentication/register/RegisterContainer.vue'
import LoginContainer from '../pages/authentication/login/LoginContainer.vue'
import ForgotPasswordContainer from '../pages/authentication/forgotPassword/ForgotPasswordContainer.vue'
import PasswordCodeContainer from '../pages/authentication/passwordCode/PasswordCodeContainer.vue'

const routes = [
  {
    path: '',
    component: Authentication,
    children: [
      {
        path: '',
        // name: 'login',
        component: LoginContainer,
      },
      {
        path: 'login',
        name: 'login',
        component: LoginContainer,
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterContainer,
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: ForgotPasswordContainer,
      },
      {
        path: 'password-code',
        name: 'password-code',
        component: PasswordCodeContainer,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
