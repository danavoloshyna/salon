const appConstants = Object.freeze({
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
  WORKER: 'WORKER',
  NONE: 'NONE',
  PATH: {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    REVIEW:'/review',
    WORKERS:'/workers',
    ADD_WORKERS: '/add_worker',
    EDIT_WORKER: '/edit_worker/:id',
    ORDERS:'/orders',
    TO_ORDER: 'to_order',
    MAIN_PAGE: '/',
  }
});

export default appConstants;
