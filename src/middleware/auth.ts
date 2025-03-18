import {getToken} from '@/services/jwtService.ts'
import type {RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

export default async function authGuard(_: RouteLocationNormalized, _s: RouteLocationNormalizedLoaded, next: (str?: string) => void) {
    console.log("Protected Middleware", _, _s, next)
    const token = getToken()
    if (token) next('/users')
    else next()
}

