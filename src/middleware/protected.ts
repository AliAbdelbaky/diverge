import {getToken, destroyToken} from '@/services/jwtService.ts';
import {useAuthStore} from '@/store/auth.ts';

export default async function (_, _s, next) {
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
    const res = authStore.setAuth(token);
    if (!res) {
        destroyToken();
        next('/auth/login');
        return;
    }
    next();
};

