import Authentication from '../layout/auth/authentication.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterContainer from '../pages/authentication/register/RegisterContainer.vue'
import LoginContainer from '../pages/authentication/login/LoginContainer.vue'
import ForgotPasswordContainer from '../pages/authentication/forgotPassword/ForgotPasswordContainer.vue'
import PasswordCodeContainer from '../pages/authentication/passwordCode/PasswordCodeContainer.vue'
import Layout from '../layout/admin/Layout.vue'
import Order from '../pages/order/Order.vue'
import ListUserContainer from '../pages/user/listUser/ListUserContainer.vue'
import { authGuard } from './authGuard'

const routes = [
  {
    path: '',
    component: Authentication,
    children: [
      {
        path: '',
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
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'user',
        component: ListUserContainer,
      },
      {
        path: 'order',
        name: 'order',
        component: Order,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)

export default router
