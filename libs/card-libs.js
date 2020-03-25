import { isServer } from './index';
const SHOPING_CARD = '_card';

export const saveCard = card =>
  !isServer ? localStorage.setItem(SHOPING_CARD, JSON.stringify(card)) : null;
export const getCard = () =>
  !isServer ? JSON.parse(localStorage.getItem(SHOPING_CARD)) : [];

export const removeCard = () =>
  !isServer ? localStorage.removeItem(SHOPING_CARD) : null;
