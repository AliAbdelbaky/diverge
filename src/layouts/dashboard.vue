<script setup lang="ts">
import AppSidebar from '@/components/dashboard/shared/appSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {Separator} from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {useRoute} from "vue-router";
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import {Button} from "@/components/ui/button";
import langHandler from "@/composables/langHandler.ts";

const route = useRoute()

const breadcrumbs = computed(() => {
  console.log(route.matched
  )
  if (route.path === '/') {
    return [{
      name: 'Home',
      url: '/'
    }]
  }
  return route.matched.map((record) => {

    return {
      name: record.path === '/' ? 'Home' : record.path.split('/').pop(),
      url: record.path,
    }
  })
})


const {setLocale,locale} = langHandler()
</script>
<template>
  <SidebarProvider>
    <AppSidebar/>
    <SidebarInset>
      <header class="flex min-h-16 shrink-0 items-center gap-2 border-b">
        <div class="flex items-center gap-2 px-3 justify-between w-full">
          <div class="flex items-center gap-2 flex-wrap">
            <SidebarTrigger/>
            <Separator orientation="vertical" class="mr-2 h-4"/>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem v-for="(item,key) in breadcrumbs" :key class="hidden md:flex items-center gap-2">
                  <component :is="key === breadcrumbs.length - 1 ? BreadcrumbPage : BreadcrumbLink" :href="item.url">
                    {{ item.name }}
                  </component>
                  <BreadcrumbSeparator v-if="key !== breadcrumbs.length - 1" class="hidden md:block"/>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Button
              size="sm"
              variant="outline"
              class="hidden md:block"
              @click="setLocale(locale === 'en' ? 'ar': 'en')"
          >
            {{ locale === 'en' ? 'ar': 'en' }}
          </Button>

        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <router-view/>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>