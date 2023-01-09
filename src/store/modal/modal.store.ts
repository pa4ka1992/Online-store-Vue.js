import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
import { IValidation, TValidationField } from './_types';
import { validationInfo, CardService, cardImages } from './_constants';

export const useModal = defineStore('Modal', () => {
  const modalIsShow = ref(false);
  const buyAttemt = ref(false);
  const orderIsCompleted = ref(false);

  const validation: IValidation<TValidationField> = reactive(validationInfo);

  const isAllValid = computed((): boolean => {
    const buyFieldKeys = <(keyof IValidation<TValidationField>)[]>Object.keys(validation);
    return buyFieldKeys.every((field) => validation[field].isValid);
  });

  const cardServiceImg = computed((): string | undefined => {
    const cardNumber = validation.card.val[0];

    switch (cardNumber) {
      case CardService.payPal:
        return cardImages.payPal;

      case CardService.unionPay:
        return cardImages.unionPay;

      case CardService.visa:
        return cardImages.visa;

      case CardService.mastercard:
        return cardImages.mastercard;

      default:
        return cardImages.americanExpress;
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

    const isValid: boolean = validation[key].regex.test(validation[key].val);

    if (isValid) {
      setValidState(true, false);
    } else {
      setValidState(false, true);
    }
  };

  return {
    modalIsShow,
    buyAttemt,
    orderIsCompleted,
    validation,
    validate,
    isAllValid,
    cardServiceImg,
  };
});
