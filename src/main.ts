import { createApp } from 'vue';
import './assets/scss/index.scss';
import './assets/font-icons/css/custom-pack.css';
import router from './router';
import App from './App.vue';
import { usePinia } from './store';
import components from '@/views/UI'

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component)
})

app.use(router)
.use(usePinia())
.mount('#app');
