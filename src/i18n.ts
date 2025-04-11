import { createI18n } from 'vue-i18n'
import VietNames from './assets/locales/vi/vi.json'
import English from './assets/locales/en/en.json'

const defaultLocale = localStorage.getItem('lang') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'vi',
  messages: {
    vi: VietNames,
    en: English,
  },
})

export default i18n
