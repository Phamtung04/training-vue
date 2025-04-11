import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './routers/router'
import { QueryClient } from './../node_modules/@tanstack/vue-query/src/queryClient'
import { VueQueryPlugin } from '@tanstack/vue-query'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './i18n'
import Icon from '@jamescoyle/vue-icon'

const vuetify = createVuetify({
  components,
  directives,
})

const queryClient = new QueryClient()

const app = createApp(App)
app.component('Icon', Icon)
app.use(i18n)
app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')
