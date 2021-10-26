import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import App from './App.vue';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';

import './assets/main.scss';

const app = createApp(App);
app.use(createPinia());

app.mount('#app');

const updateSW = registerSW({
  onOfflineReady() {
    console.log('Ready to work offline');
  },
});
