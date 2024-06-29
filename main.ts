import { createApp } from 'vue';
import App from './static/app';
import { createPinia } from 'pinia';
import router from './static/router';
const app = createApp(App);

(window as any).process = { platform: 'win32' };

app.use(createPinia);
app.use(router);

app.mount('#app');
