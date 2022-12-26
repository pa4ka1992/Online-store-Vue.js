import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { IValidation, TValidationField } from './types';
import { validationInfo } from './constants';

export const useModalStore = defineStore('ModalStore', () => {
  const modalIsShow = ref(false);
  const validation: IValidation<TValidationField> = reactive(validationInfo);

  const validate = (key: keyof IValidation<TValidationField>): void => {
    const regex = new RegExp(validation[key].regex, 'i');
    const isValid: boolean = regex.test(validation[key].val);
    console.log(isValid);

    if (isValid) {
      validation[key].isValid = true;
    } else {
      validation[key].isValid = false;
    }
  };

  return {
    modalIsShow,
    validation,
    validate,
  };
});
