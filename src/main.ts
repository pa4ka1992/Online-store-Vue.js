import { createApp } from 'vue';
import './assets/scss/index.scss';
import './assets/font-icons/css/custom-pack.css';
import router from './router';
import App from './App.vue';
import { usePinia } from './store';
import components from '@/views/UI'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component)
})
//вынести фонтавсом в отдельный файл
library.add(faStar)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
.use(usePinia())
.mount('#app');



