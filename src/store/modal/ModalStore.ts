import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
import { IValidation, TValidationField } from './types';
import { validationInfo } from './constants';
import visa from '@/assets/img/visa.png';
import mastercard from '@/assets/img/mastercard.png';
import americanExpress from '@/assets/img/americanExpress.png';
import payPal from '@/assets/img/payPal.png';
import unionPay from '@/assets/img/unionPay.png';

export const useModalStore = defineStore('ModalStore', () => {
  const modalIsShow = ref(false);
  const validation: IValidation<TValidationField> = reactive(validationInfo);

  const isAllValid = computed((): boolean => {
    const buyFieldKeys = <(keyof IValidation<TValidationField>)[]>Object.keys(validation);
    return buyFieldKeys.every((field) => validation[field].isValid);
  });

  const cardServiceImg = computed((): string | undefined => {
    const cardNumber = validation.card.val[0];

    switch (cardNumber) {
      case '1':
        return payPal;

      case '3':
        return unionPay;

      case '4':
        return visa;

      case '5':
        return mastercard;

      default:
        return americanExpress;
    }
  });

  const validate = (key: keyof IValidation<TValidationField>): void => {
    const setValidState = (valid: boolean, alert: boolean): void => {
      validation[key].isValid = valid;
      validation[key].isAlert = alert;
    };

    if (!validation[key].val) {
      setValidState(false, false);
      return;
    }

    const regex = new RegExp(validation[key].regex, 'i');
    const isValid: boolean = regex.test(validation[key].val);

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
    cardServiceImg,
  };
});
