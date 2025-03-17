import {ofetch, type FetchResponse} from "ofetch";
import {toast} from "vue-sonner";
import {type App, computed} from "vue";

interface PluginOptions {
    BASE_URL: string;
}

let api_provider: ReturnType<typeof ofetch.create>; // Ensure type safety

export default {
    install: (app: App, options: PluginOptions) => {
        const AUTH_COOKIE = computed(() => localStorage.getItem("token") || '');
        const {BASE_URL} = options;

        const handleErrors = async (error: FetchResponse<unknown>) => {
            console.log("Error:", toast);
            if (error.status === 401) {
                toast.error("Unauthorized", {
                    description: "You are not authorized to access this resource",
                    position: "top-center",
                    important: true,
                    richColors: true,
                });
                return app.config.globalProperties.$router?.push("/login");
            }
            toast.error("Unauthorized", {
                description: "You are not authorized to access this resource",
                position: "top-center",
                important: true,
                richColors: true,
            });
        };

        api_provider = ofetch.create({
            baseURL: BASE_URL,
            onRequest({options}) {
                options.headers = getDefaultHeaders(AUTH_COOKIE.value, options.headers);
                notifyPayload(options.body);
            },
            async onResponseError({response}) {
                await handleErrors(response);
                throw response;
            },
        });

        app.config.globalProperties.api_provider = api_provider; // Type-safe addition
    },
};

// Export `api_provider` for direct import usage
export {api_provider};

function getDefaultHeaders(token?: string, _headers?: HeadersInit): HeadersInit {
    return {
        ..._headers,
        Accept: "application/json",
        "Accept-Language": localStorage.getItem("locale") || "en",
        Authorization: token ? `Bearer ${token}` : '',
    };
}

function notifyPayload(body: unknown) {
    if (import.meta.env.MODE === "development") {
        console.log("Payload:", body);
    }
}
