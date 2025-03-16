<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      {{ $t('hello') }}
    </h1>
    <router-view/>
  </div>
</template>

<style scoped>
</style>
