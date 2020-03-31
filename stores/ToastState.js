import { merge, get } from 'lodash/fp';
import { ACTIONS } from 'redux-api-call';
import { LOGIN_ADMIN, DELETE_USER } from './UserState';
import { ADD_TO_CART, REMOVE_ITEM } from './CartState';
import { SAVE_BOOK, DELETE_BOOK } from './BookState';
import { SAVE_ORDERS } from './OrderState';
import { DEFAULT_OPTION_TOAST } from '../utils/options';
import {
  TOAST_ERROR,
  TOAST_SUCCESS,
  TOAST_DEFAULT,
  TOAST_INFO
} from '../enums/actions';
export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_TOAST = 'REMOVE_TOAST';

const defaultState = {
  notifications: []
};

const doToastWithType = ({ state = defaultState, message, type }) => {
  if (!message) return state;
  const newNotification = merge(DEFAULT_OPTION_TOAST(), {
    options: { variant: type },
    message
  });
  return {
    ...state,
    notifications: [
      ...state.notifications,
      {
        ...newNotification,
        key: newNotification.options.key
      }
    ]
  };
};
export const removeToast = key => ({
  type: REMOVE_TOAST,
  key
});
const hasErrors = get('json.errors');

export default {
  toastNotification: (
    state = defaultState,
    { type, payload = {}, notification = {}, key }
  ) => {
    const { name } = payload;
    let msgNotify = '';
    if (type === ACTIONS.COMPLETE && !hasErrors(payload)) {
      switch (name) {
        case LOGIN_ADMIN:
          msgNotify = 'Login success';
          break;
        case DELETE_USER:
          msgNotify = 'Delete Success';
          break;
        case REMOVE_ITEM:
          msgNotify = 'Remove item from card success';
          break;
        case SAVE_BOOK:
          msgNotify = 'Save book success';
          break;
        case DELETE_BOOK:
          msgNotify = 'Delete success';
          break;
        case SAVE_ORDERS:
          msgNotify = 'Your order is successful';
          break;
        default:
          break;
      }
      return merge(
        doToastWithType({
          state,
          message: msgNotify,
          type: TOAST_SUCCESS
        }),
        payload
      );
    } else if (
      type === ACTIONS.FAILURE ||
      (type === ACTIONS.COMPLETE && hasErrors(payload))
    ) {
      switch (name) {
        case LOGIN_ADMIN:
          msgNotify = 'Login fail';
          break;
        case DELETE_USER:
          msgNotify = 'Delete Fail';
          break;
        case REMOVE_ITEM:
          msgNotify = 'Remove item from card fail';
          break;
        case SAVE_BOOK:
          msgNotify = 'Save book fail';
          break;
        case DELETE_BOOK:
          msgNotify = 'Delete fail';
          break;
        case SAVE_ORDERS:
          msgNotify = 'Your order is successful';
          break;
        default:
          break;
      }
      return merge(
        doToastWithType({
          state,
          message: msgNotify,
          type: TOAST_ERROR
        }),
        payload
      );
    } else {
      switch (type) {
        case ADD_TO_CART:
          notification.message = 'Add to cart success';
          const newNotiwihtCart = merge(DEFAULT_OPTION_TOAST(), notification);
          newNotiwihtCart.options.variant = TOAST_SUCCESS;
          return {
            ...state,
            notifications: [
              ...state.notifications,
              {
                ...newNotiwihtCart,
                key: newNotiwihtCart.options.key
              }
            ]
          };
        case TOAST_INFO:
        case TOAST_SUCCESS:
        case TOAST_ERROR:
        case TOAST_DEFAULT:
          if (!notification.message) return state;
          const newNotification = merge(DEFAULT_OPTION_TOAST(), notification);
          if (!notification.options || !notification.options.variant) {
            newNotification.options.variant = type;
          }
          return {
            ...state,
            notifications: [
              ...state.notifications,
              {
                ...newNotification,
                key: newNotification.options.key
              }
            ]
          };
        case REMOVE_TOAST:
          return {
            ...state,
            notifications: state.notifications.filter(
              notification => notification.key !== key
            )
          };
        default:
          return state;
      }
    }
  }
};
