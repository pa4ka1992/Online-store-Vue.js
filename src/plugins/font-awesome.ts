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
  faCircleCheck,
  faCircleXmark,
  faArrowsRotate,
  faArrowsLeftRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { App } from 'vue';

export const fontAwesomePlugin = (app: App): void => {
  library.add(
    faStar,
    faMinus,
    faPlus,
    faTrash,
    faSpinner,
    faXmark,
    faArrowRight,
    faArrowLeft,
    faCircleCheck,
    faCircleXmark,
    faArrowsRotate,
    faArrowsLeftRight,
  );
  app.component('FontAwesomeIcon', FontAwesomeIcon);
};
