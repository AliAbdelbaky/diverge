import {createI18n} from 'vue-i18n';
import en from '@/locales/en-us.json';
import ar from '@/locales/ar-eg.json';

const i18n = createI18n({
    legacy: false,
    locale: localStorage?.getItem("locale") || "en",
    fallbackLocale: 'ar',
    messages: {en, ar},
    globalInjection: true,
});
export default i18n;