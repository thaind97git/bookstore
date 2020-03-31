import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call';

import toastState from './ToastState';
import navigateState from './NavigateState';
import cardState from './CartState';

export default combineReducers({
  ...apiReducers,
  ...toastState,
  ...navigateState,
  ...cardState
});
