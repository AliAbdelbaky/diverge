import {getToken} from '@/services/jwtService.ts'
import type {RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

export default async function authGuard(_: RouteLocationNormalized, _s: RouteLocationNormalizedLoaded, next: (str?: string) => void) {
    const token = getToken()
    if (token) next('/users')
    else next()
}

