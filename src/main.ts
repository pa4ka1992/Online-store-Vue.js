import { createApp } from 'vue';
import './assets/scss/index.scss';
import './assets/font-icons/css/custom-pack.css';
import router from './router';
import App from './App.vue';
import { commonPlugin, fontAwesomePlugin } from './plugins';
import { usePinia } from './store';
import components from '@/components/UI';
import { apllyAwesome } from '@/services/awesome';


export const app = createApp(App);

app.use(router)
   .use(usePinia())
   .use(commonPlugin)
   .use(fontAwesomePlugin)
   .mount('#app');
