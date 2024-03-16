const path = {
  home: '/',
  login: '/login',
  user: '/user',
  register: '/register',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/history',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const

export default path
