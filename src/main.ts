import { createApp } from 'vue';
import App from './App.vue';

import { setupStore } from '@/store';
import router from '@/router'
import i18n from '@/locales'

import 'virtual:svg-icons-register';
import '@/styles/index.scss';

const app = createApp(App);

setupStore(app);
app.use(i18n);
app.use(router).mount('#app');
