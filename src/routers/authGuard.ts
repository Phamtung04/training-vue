import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const isAuthenticated = () => {
  return !!localStorage.getItem('training_vue_token_access')
}

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const publicPages = ['login', 'register', 'forgot-password', 'password-code']
  const authRequired = !publicPages.includes(to.name as string)
  const isAuth = isAuthenticated()

  if (authRequired && !isAuth) {
    return next({ name: 'login' })
  }

  if (!authRequired && isAuth && to.name === 'login') {
    return next({ name: 'user' })
  }

  return next()
}
