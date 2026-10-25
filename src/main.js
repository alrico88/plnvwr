import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { setWorkerUrl } from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { registerSW } from 'virtual:pwa-register';
import App from './App.vue';

import './assets/main.scss';

setWorkerUrl(maplibreWorkerUrl);

const app = createApp(App);
app.use(createPinia());

app.mount('#app');

const updateSW = registerSW({
  onOfflineReady() {
    console.log('Ready to work offline');
  },
});
