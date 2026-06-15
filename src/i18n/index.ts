import { createI18n } from 'vue-i18n';
import { messages, type SupportedLocale } from './messages';

export const defaultLocale: SupportedLocale = 'es-ES';

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'es-419',
  messages
});
