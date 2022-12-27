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
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { App } from 'vue';

export const fontAwesomePlugin = (app: App): void => {
  library.add(faStar, faMinus, faPlus, faTrash, faSpinner, faXmark, faArrowRight, faArrowLeft, faCheck);
  app.component('FontAwesomeIcon', FontAwesomeIcon);
};

