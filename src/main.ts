import { createApp } from 'vue';
import './assets/scss/index.scss';
import router from './router';
import App from './App.vue';
import { usePinia } from './store';

const app = createApp(App);

app.use(router)
.use(usePinia())
.mount('#app');
