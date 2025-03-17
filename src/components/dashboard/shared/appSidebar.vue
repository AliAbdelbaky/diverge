<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  type SidebarProps,
  SidebarRail,
} from '@/components/ui/sidebar'
import {GalleryVerticalEnd, LogOut} from 'lucide-vue-next'
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useAuthStore} from "@/store/auth.ts";


const {logout} = useAuthStore()


const {locale, t} = useI18n()
const props = defineProps<SidebarProps>()
// This is sample data.
const data = {
  navMain: [
    {
      title: t('getStarted'),
      url: '#',
      items: [
        {
          title: computed(() => t('homepage')),
          url: '/',
        },
        {
          title: computed(() => t('users')),
          url: 'users',
        },
      ],
    },
  ],
}
</script>
<template>
  <Sidebar v-bind="props" :side="locale === 'ar' ? 'right' : 'left'">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <router-link to="/users">
              <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd class="size-4"/>
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">Diverge</span>
              </div>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
            <SidebarMenuButton v-for="child in item.items" as-child>
              <router-link :to="child.url">
                {{ child.title }}
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton @click="logout">
            <LogOut/>
            <span class="text-xs">{{$t('logout')}}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail/>
  </Sidebar>
</template>