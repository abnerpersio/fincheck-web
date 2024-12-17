export const endpoints = {
  signin: '/auth/signin',
  signup: '/auth/signup',
  me: '/users/me',
  bankAccount: {
    list: '/bank-accounts',
    create: '/bank-accounts',
    update: '/bank-accounts/:id',
    delete: '/bank-accounts/:id',
  },
  transaction: {
    list: '/transactions',
    create: '/transactions',
    update: '/transactions/:id',
    delete: '/transactions/:id',
  },
  category: {
    list: '/categories',
  },
};
