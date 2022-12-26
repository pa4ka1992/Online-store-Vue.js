export const validationInfo = {
  fullName: {
    val: '',
    isValid: false,
    regex: '/[a-z]{3,} [a-z]{3,}/',
  },
  phone: {
    val: '',
    isValid: false,
    regex: '/^+[0-9]{9,}$/',
  },
  adress: {
    val: '',
    isValid: false,
    regex: '/w{5,} w{5,} w{5,}/',
  },
  email: {
    val: '',
    isValid: false,
    regex: '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/',
  },
  card: {
    val: '',
    isValid: false,
    regex: '^/[0-9]{16}/$',
  },
  date: {
    val: '',
    isValid: false,
    regex: '/^(0[1-9]|1[0-2])\/?([0-9]{2})$/',
  },
  CVV: {
    val: '',
    isValid: false,
    regex: '/^[0-9]{3}$/',
  },
}