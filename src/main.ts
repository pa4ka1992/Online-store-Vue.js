import { createApp } from 'vue';
import './assets/scss/index.scss';
import './assets/font-icons/css/custom-pack.css';
import router from './router';
import App from './App.vue';
import { commonPlugin, fontAwesomePlugin } from './plugins';
import { usePinia } from './store';

export const app = createApp(App);

app.use(usePinia())
   .use(router)
   .use(commonPlugin)
   .use(fontAwesomePlugin)
   .mount('#app');
