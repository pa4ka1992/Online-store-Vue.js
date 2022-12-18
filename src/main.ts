import { createApp } from 'vue';
import './assets/scss/index.scss';
import './assets/font-icons/css/custom-pack.css';
import router from './router';
import App from './App.vue';
import { usePinia } from './store';

const app = createApp(App);

app.use(router);
app.use(usePinia());
app.mount('#app');
