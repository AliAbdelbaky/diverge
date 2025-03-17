import {createApp} from 'vue'
import './assets/styles/main.css'
import App from './App.vue'

import router from './router'
import {createPinia} from 'pinia'
import i18n from '@/plugins/i18n';
import ApiProvider from "@/plugins/apiProvider.ts";

const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(i18n);
app.use(ApiProvider, {BASE_URL: 'http://localhost:5000/api'})

app.mount('#app')

