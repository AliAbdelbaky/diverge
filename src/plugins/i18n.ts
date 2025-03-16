import {createI18n} from 'vue-i18n';
import en from '@/locales/en-us.json';
import ar from '@/locales/ar-eg.json';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'ar',
    messages: {en, ar},
});
export default i18n;