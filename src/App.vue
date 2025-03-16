<script setup lang="ts">
import {getCurrentInstance, onMounted} from 'vue'
import {RouterView} from 'vue-router'

const instance = getCurrentInstance();
const testPlugin = async () => {
  try {
    const response = await instance?.proxy?.api_provider('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'get',
    })
    console.log('response', response)
  } catch (e) {
    console.log('error', e)
  }
}
onMounted(() => {
  testPlugin()
})


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
