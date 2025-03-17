import { ofetch, type FetchOptions } from "ofetch";
import { useI18n } from "vue-i18n";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        api_provider: <T>(url: string, options?: FetchOptions) => Promise<T> | undefined; // Fully type-safe API provider
        $t: ReturnType<typeof useI18n>["t"]; // Ensures `$t` has correct typing
    }
}
