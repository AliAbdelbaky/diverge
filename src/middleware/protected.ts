import {getToken, destroyToken} from '@/services/jwtService.ts';
import {useAuthStore} from '@/store/auth.ts';
import type {RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

export default async function (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: (str?: string) => void) {

    console.log("Protected Middleware", to, from, next)
    const authStore = useAuthStore();
    const token = getToken();

    console.log("Token:", token, authStore);

    if (!token) {
        next('/auth/login');
        return;
    }
    authStore.token = getToken();
    authStore.isAuth = true;
    // const { roles } = to.meta;
    const res = await authStore.setAuth(token);
    if (!res) {
        destroyToken();
        next('/auth/login');
        return;
    }
    next();
};

