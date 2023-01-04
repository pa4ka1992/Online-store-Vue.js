export const Promos = [
  { id: 1, value: 0.2, title: 'RS-school', name: 'rs-school' },
  { id: 2, value: 0.3, title: 'Gachi', name: 'gachi' },
  { id: 3, value: 0.1, title: 'Billy', name: '300bucks' },
];

export enum CartDefaultVal {
  ProductCount = 1,
  decrementLimit = 2,
  page = 1,
  limit = 10,
}

export const maxLimit = [1, 2, 3, 4, 5, 10, 25, 50, 100];

export enum LSKey {
  cart = 'cart',
  page = 'cart-page',
  limit = 'cart-limit',
}
