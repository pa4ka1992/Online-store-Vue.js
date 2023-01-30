export const PROMOS = [
  { id: 1, value: 0.05, title: 'RS-school', name: 'RS-school' },
  { id: 2, value: 0.15, title: 'Gachi', name: 'gachi' },
  { id: 3, value: 0.3, title: 'Slave', name: '300bucks' },
  { id: 4, value: 0.2, title: 'StoreRS', name: 'storeRS' },
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
