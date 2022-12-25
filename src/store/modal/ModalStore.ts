import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useModalStore = defineStore('ModalStore', () => {
  const modalIsShow = ref(false);
  const validation = reactive({
    fullName: { val: '', isValid: false },
    phone: { val: '', isValid: false },
    adress: { val: '', isValid: false },
    email: { val: '', isValid: false },
    card: { val: '', isValid: false },
    date: { val: '', isValid: false },
    CVV: { val: '', isValid: false },
  });

  const validateName = (): void => {
    const valid: number = validation.fullName.val.search(/[a-z]{3,} [a-z]{3,}/i);
    console.log(valid);
    if (valid >= 0) {
      validation.fullName.isValid = true;
    } else {
      validation.fullName.isValid = false;
    }
  };

  return {
    modalIsShow,
    validation,
    validateName,
  };
});
