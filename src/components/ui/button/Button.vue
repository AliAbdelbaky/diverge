<script setup lang="ts">
import type {HTMLAttributes} from 'vue'
import {withDefaults, defineProps, useSlots} from 'vue'
import {cn} from '@/lib/utils'
import {Primitive, type PrimitiveProps} from 'reka-ui'
import {type ButtonVariants, buttonVariants} from '.'
import {Loader2} from 'lucide-vue-next';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class'],
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
const slots = useSlots();
</script>

<template>
  <Primitive
      :as="as"
      :as-child="asChild"
      :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <!--    {{ slots }}-->
    <slot/>
    <div
        class="tw-flex tw-items-center tw-gap-1"
        v-show="slots?.suffix || loading"
    >
      <slot v-if="slots?.suffix" name="suffix"/>
      <Loader2 v-if="loading" class="tw-w-4 tw-h-4 tw-animate-spin"/>
    </div>
  </Primitive>
</template>
