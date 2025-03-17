<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'

import {ref} from 'vue'
import {Mail, Lock, Eye, EyeClosed} from 'lucide-vue-next';
import {useAuthStore} from "@/store/auth.ts";
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {useI18n} from "vue-i18n";


const authStore = useAuthStore()
const {t} = useI18n()
const showPass = ref(false);
const loading = ref(false);


const formSchema = toTypedSchema(
    z.object({
      email: z
          .string({message: t('errors.field:required')})
          .email(t('errors.field:invalid:email')),
      password: z
          .string({message: t('errors.field:required')})
          .min(6, t('errors.field:invalid:minLength', {length: 6}))
          .max(50, t('errors.field:invalid:maxLength', {length: 50})),
    }),
);
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: 'admin@test.com',
    password: 'admin@test.com',
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    console.log(values)
    loading.value = true;
    await authStore.login(values)
  } catch (e) {
    console.log('e', e)
  } finally {
    loading.value = false;
  }
})
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        {{ $t('login.title') }}
      </CardTitle>
      <CardDescription>
        {{ $t('login.subtitle') }}
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <FormField
            #default="{ componentField }"
            name="email"
        >
          <FormItem>
            <FormControl>
              <Input
                  type="text"
                  :placeholder="$t('inputs.email')"
                  v-bind="componentField"
              >
                <template #prefix>
                  <Mail/>
                </template>
              </Input>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
        <FormField
            #default="{ componentField }"
            name="password"
        >
          <FormItem>
            <FormControl>
              <Input
                  :type="showPass ? 'text' : 'password'"
                  :placeholder="$t('inputs.password')"
                  v-bind="componentField"
              >
                <template #prefix>
                  <Lock/>
                </template>
                <template #suffix>
                  <component
                      class="cursor-pointer"
                      @click="showPass = !showPass"
                      :is="showPass ? Eye :EyeClosed"
                  />
                </template>
              </Input>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
      </form>
    </CardContent>
    <CardFooter>
      <Button class="w-full" @click="onSubmit" :loading :disabled="loading">
        {{ $t('login.submit') }}
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped>

</style>