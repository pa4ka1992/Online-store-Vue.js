import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, beforeEach, test, expect } from 'vitest';
import { useModal } from '@/store';
import { cardImages } from '@/store/modal/_constants';

describe('products', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('cardServiceImg returns correct card service', () => {
    const { validation, cardServiceImg } = storeToRefs(useModal());

    validation.value.card.val = '1';

    expect(cardServiceImg.value).toBe(cardImages.payPal);

    validation.value.card.val = '3';

    expect(cardServiceImg.value).toBe(cardImages.unionPay);
  });

  test('validate works correctly', () => {
    const { validation } = storeToRefs(useModal());
    const { validate } = useModal();

    validation.value.fullName.val = 'Don Spiridon';
    validation.value.phone.val = '+375 (29) 333-33-33';
    validation.value.adress.val = 'Baker street 21000';
    validation.value.email.val = 'sour234@gmail.com';
    validation.value.card.val = '1234 1234 1234';
    validation.value.date.val = '02/23';
    validation.value.CVV.val = '11212';

    validate('fullName');
    validate('phone');
    validate('adress');
    validate('email');
    validate('card');
    validate('date');
    validate('CVV');

    expect(validation.value.fullName.isValid).toBeTruthy();
    expect(validation.value.phone.isValid).toBeTruthy();
    expect(validation.value.adress.isValid).toBeTruthy();
    expect(validation.value.email.isValid).toBeTruthy();
    expect(validation.value.card.isValid).toBeFalsy();
    expect(validation.value.date.isValid).toBeTruthy();
    expect(validation.value.CVV.isValid).toBeFalsy();
  });

  test('isAllValid works correctly', () => {
    const { validation, isAllValid } = storeToRefs(useModal());
    const { validate } = useModal();

    validation.value.fullName.val = 'Don Spiridon';
    validation.value.phone.val = '+375 (29) 333-33-33';
    validation.value.adress.val = 'Baker street 21000';
    validation.value.email.val = 'sour234@gmail.com';
    validation.value.card.val = '1234 1234 1234 1234';
    validation.value.date.val = '02/23';
    validation.value.CVV.val = '112';

    validate('fullName');
    validate('phone');
    validate('adress');
    validate('email');
    validate('card');
    validate('date');
    validate('CVV');

    expect(isAllValid.value).toBeTruthy();
  });
});
