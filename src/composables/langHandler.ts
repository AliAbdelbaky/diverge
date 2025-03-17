export type Lang = 'en' | 'ar';
import {useI18n} from "vue-i18n";

export default function langHandler() {
    const {locale} = useI18n();

    const setLocale = (lang: Lang) => {
        locale.value = lang;
        if (!window) return;
        localStorage?.setItem("locale", lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    }

    return {setLocale, locale}
}