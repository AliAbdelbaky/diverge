import { ofetch } from "ofetch";
import { useI18n } from "vue-i18n";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        api_provider: ReturnType<typeof ofetch.create>; // Fix for correct typing
        $t: ReturnType<typeof useI18n>["t"]; // Fix for correct typing of `$t`
    }
}
