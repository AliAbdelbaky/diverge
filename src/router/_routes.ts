import type {RouteRecordRaw} from "vue-router";
// import {AUTH} from '@/types';

import DashboardLayout from "@/layouts/dashboard.vue";
import AuthLayout from "@/layouts/auth.vue";
import EmptyLayout from "@/layouts/empty.vue";

import ProtectedMiddleware from "@/middleware/protected.ts";
import AuthMiddleware from "@/middleware/auth.ts";

// import dashboard from '@/views/layouts/dashboard.vue';
// import auth from '@/views/layouts/auth.vue';

// import authGuard from '@/guards/auth.guard';
// import pagesGurd from '@/guards/page.guard';

import LoginView from '@/pages/(auth)/login.vue';


type layouts = 'dashboard' | 'auth' | 'empty'

const _404_handler: RouteRecordRaw = {
    path: '/:catchAll(.*)',
    redirect: {
        name: getRouteName('empty', '404'),
        params: {
            resource: 'page',
        },
    },
}

const dashboardRoutes: RouteRecordRaw = {
    path: '/',
    component: DashboardLayout,
    beforeEnter: async (to, from, next) => {
        await ProtectedMiddleware(to, from, next);
    },
    children: [
        {
            path: '',
            name: getRouteName('dashboard', 'home'),
            component: () => import('@/pages/(dashboard)/index.vue'),
        },
        {
            path: '/users',
            name: getRouteName('dashboard', 'users'),
            component: () => import('@/pages/(dashboard)/users.vue'),
        },
    ],
}

const authRoutes: RouteRecordRaw = {
    path: '/auth',
    name: 'auth',
    redirect: 'auth/login',
    component: AuthLayout,
    beforeEnter: async (to, from, next) => {
        await AuthMiddleware(to, from, next);
    },
    children: [
        {
            path: 'login',
            name: getRouteName('auth', 'login'),
            component: LoginView,
        },
    ]
}

const emptyRoutes: RouteRecordRaw = {
    path: '/',
    component: EmptyLayout,
    children: [
        {
            name: getRouteName('empty', '404'),
            path: '404',
            component: () => import('@/pages/404.vue'),
        }
    ]
}


const routes: RouteRecordRaw[] = [
    _404_handler,
    authRoutes,
    dashboardRoutes,
    emptyRoutes
];

export {routes}


export function getRouteName(layout: layouts, routeName?: string): string {
    if (!routeName) {
        return `${layout}-layout`
    }
    const name = routeName.trim()
    return `${layout}-${name}`
}