import Auth from '../pages/Auth';
import Review from '../pages/Review';
import Workers from '../pages/Workers';
import Orders from '../pages/Orders';
import ToOrder from '../pages/ToOrder';
import appConstants from './consts';
import AddWorker from '../pages/AddWorker';

export const publicPath = [
  {path: appConstants.PATH.REVIEW, title: 'Відгуки', Component: Review},
  {path: appConstants.PATH.LOGIN, title: 'Увійти', Component: Auth},
  {path: appConstants.PATH.REGISTRATION, title: 'Реєстрація', Component: Auth},
];

export const adminsPath = [
  {path: appConstants.PATH.WORKERS, title: 'Працівники', Component: Workers},
  {path: appConstants.PATH.ADD_WORKERS, title: 'Створити працівника', Component: AddWorker},
];

export const workersPath = [
  {path: appConstants.PATH.ORDERS, title: 'Ваші записи', Component: Orders},
];

export const clientsPath = [
  {path: appConstants.PATH.REVIEW, title: 'Відгуки', Component: Review},
  {path: appConstants.PATH.TO_ORDER, title: 'Записатись', Component: ToOrder},
  
];
