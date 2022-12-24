import { App } from 'vue';
import components from '@/components/UI'

export const commonPlugin = {
  install: (app: App) => {
    components.forEach((component) => {
      app.component(component.name, component);
    });
  },
};