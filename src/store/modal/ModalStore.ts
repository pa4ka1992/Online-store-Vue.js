import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
import { IValidation, TValidationField } from './types';
import { validationInfo } from './constants';

export const useModalStore = defineStore('ModalStore', () => {
  const modalIsShow = ref(false);
  const validation: IValidation<TValidationField> = reactive(validationInfo);

  const isAllValid = computed((): boolean => {
    const buyFieldKeys = <(keyof IValidation<TValidationField>)[]>Object.keys(validation);
    return buyFieldKeys.every((field) => validation[field].isValid);
  })

  const validate = (key: keyof IValidation<TValidationField>): void => {

    const setValidState = (valid: boolean, alert: boolean): void => {
      validation[key].isValid = valid;
      validation[key].isAlert = alert;
    }

    if (!validation[key].val) {
      setValidState(false, false);
      return;
    }
    
    const regex = new RegExp(validation[key].regex, 'i');
    const isValid: boolean = regex.test(validation[key].val);
    console.log(isValid);

    if (isValid) {
      setValidState(true, false);
    } else {
      setValidState(false, true);
    }
  };

  return {
    modalIsShow,
    validation,
    validate,
    isAllValid,
  };
});
