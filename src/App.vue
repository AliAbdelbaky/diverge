<script setup lang="ts">
import {onMounted} from 'vue'
import {RouterView} from 'vue-router'
import langHandler, {type Lang} from "@/composables/langHandler.ts";
import {Toaster} from 'vue-sonner'


const {setLocale} = langHandler()
onMounted(() => {
  setLocale((localStorage.getItem('locale') || 'en') as Lang)
})
</script>

<template>
  <Toaster/>
  <router-view/>
</template>

<style scoped>
</style>
