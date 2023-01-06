import { TModifyFunc } from './types';
import visa from '@/assets/img/visa.png';
import mastercard from '@/assets/img/mastercard.png';
import americanExpress from '@/assets/img/americanExpress.png';
import payPal from '@/assets/img/payPal.png';
import unionPay from '@/assets/img/unionPay.png';

export enum CardService {
  payPal = '1',
  unionPay = '3',
  visa = '4',
  mastercard = '5',
}

export const cardImages = {
  visa: visa,
  mastercard: mastercard,
  americanExpress: americanExpress,
  payPal: payPal,
  unionPay: unionPay,
};

const modifyName: TModifyFunc = function (this) {
  this.val = this.val.replace(/\s{2,}/g, ' ');
  this.val = this.val.replace(/\d/g, '');
};

const modifyAdress: TModifyFunc = function (this) {
  this.val = this.val.replace(/\s{2,}/g, ' ');
};

const modifyPhone: TModifyFunc = function (this) {
  if (this.val.length > 0 && this.val[0] !== '+') {
    this.val = '+'.concat(this.val);
  }
  this.val = this.val.replace(/[^0-9+\s()-]/g, '');
  this.val = this.val.replace(/\s{2,}/g, ' ');
};

const modifyEmail: TModifyFunc = function (this) {
  this.val = this.val.replace(/\s/g, '');
};

const modifyCard: TModifyFunc = function (this) {
  this.val = this.val.replace(/[^0-9]/g, '');
  const separate: string[] | null = this.val.match(/[0-9]{1,4}/g);
  if (separate) {
    this.val = separate.join(' ');
  }
};

const modifyDate: TModifyFunc = function (this) {
  this.val = this.val.replace(/[^0-9]/g, '');
  const separate: string[] | null = this.val.match(/[0-9]{1,2}/g);
  if (separate) {
    this.val = separate.join('/');
  }
};

const modifyCVV: TModifyFunc = function (this) {
  this.val = this.val.replace(/[^0-9]/g, '');
};

export const validationInfo = {
  fullName: {
    val: '',
    isValid: false,
    isAlert: false,
    regex: '^[a-zа-я]{3,}\\s+[a-zа-я]{3,}',
    header: 'Full name',
    placeholder: 'Firstname Lastname',
    alert: 'Full name is incorrect. Should be composed no less than two words, at least three letters length each',
    modify: modifyName,
  },
  phone: {
    val: '',
    isValid: false,
    isAlert: false,
    regex: '^\\+[0-9]([\\s\\-(]?[0-9][\\s)]?){8,}$',
    header: 'Phone number',
    placeholder: '+XXX XX XXX-XX-XX',
    alert: 'Phone number is incorrect. Should start with +, length isn`t shorter than 9, only numbers',
    modify: modifyPhone,
  },
  adress: {
    val: '',
    isValid: false,
    isAlert: false,
    regex: '^[a-zа-я]{5,}\\s+[a-zа-я]{5,}+[a-zа-я]{5,}',
    header: 'Delivery adress',
    placeholder: 'Enter your address',
    alert: 'Adress is incorrect. Should be composed no less than three words, at least five letters length each',
    modify: modifyAdress,
  },
  email: {
    val: '',
    isValid: false,
    isAlert: false,
    regex:
      '^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    header: 'E-mail',
    placeholder: 'example@gmail.com',
    alert: 'Email is incorrect. Follow example: myNickName@myService.domain',
    modify: modifyEmail,
  },
  card: {
    val: '',
    isValid: false,
    isAlert: false,
    regex: '^(\\s?[0-9]{4}\\s?){4}$',
    header: 'Card number',
    placeholder: 'XXXX XXXX XXXX XXXX',
    alert: 'Card number is incorrect. Number of digits must be 16',
    modify: modifyCard,
    maxLength: '19',
  },
  date: {
    val: '',
    isValid: false,
    isAlert: false,
    regex: '^(0[1-9]|1[0-2])/?2([3-9])$',
    header: 'VALID THRU',
    placeholder: 'ММ/YY',
    alert: 'Сard has expired',
    modify: modifyDate,
    maxLength: '5',
  },
  CVV: {
    val: '',
    isValid: false,
    isAlert: false,
    regex: '^[0-9]{3}$',
    header: 'CVV',
    placeholder: 'XXX',
    alert: 'Card number is incorrect. Number of digits must be 3',
    modify: modifyCVV,
    maxLength: '3',
  },
};
