import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faPlus,
  faMinus,
  faTrash,
  faSpinner,
  faXmark,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { App } from 'vue';

export const fontAwesomePlugin = {
  install: (app: App) => {
    library.add(faStar, faMinus, faPlus, faTrash, faSpinner, faXmark, faArrowRight, faArrowLeft);
    app.component('font-awesome-icon', FontAwesomeIcon);
  },
};
