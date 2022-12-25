import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useModalStore = defineStore('ModalStore', () => {
  const modalIsShow = ref(false);
  const validation = reactive({
    fullName: { val: '', isValid: false },
    phone: { val: NaN, isValid: false },
    adress: { val: '', isValid: false },
    email: { val: '', isValid: false },
    card: { val: '', isValid: false },
    date: { val: '', isValid: false },
    CVV: { val: '', isValid: false },
});

const validateName = () => {
  console.log(true)
}

  return {
    modalIsShow,
    validation,
    validateName,
  };
});
