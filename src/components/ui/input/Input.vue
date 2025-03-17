<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import { Loader2 } from 'lucide-vue-next';

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  hasError?: boolean;
  loading?: boolean;
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div
      :class="
      cn(
        'relative flex items-center gap-3 h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <div
        class="border border-input absolute inset-0 border-red-500 rounded-md pointer-events-none"
        v-if="$attrs['aria-invalid']"
    ></div>
    <slot name="prefix" v-if="!!$slots.prefix" />
    <input
        v-model="modelValue"
        v-bind="$attrs"
        :error="hasError"
        :aria-errormessage="hasError ? 'error' : undefined"
        :class="
        cn(
          'flex h-full w-full bg-background text-sm ring-offset-background py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed',
          props.class,
        )
      "
    />
    <div
        v-if="!!$slots.suffix || loading"
        class="flex items-center gap-1"
    >
      <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
      <slot name="suffix" v-if="!!$slots.suffix" />
    </div>
  </div>
</template>
<style scoped>
div:has(input:is(:disabled)) {
  @apply cursor-not-allowed opacity-50;
}
</style>
