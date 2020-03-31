import { getCard, removeCard, saveCard } from '../libs/card-libs';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REMOVE_CART = 'REMOVE_CART';

export default {
  shopingCart: (state = [], { type, payload = {} }) => {
    state = getCard() || [];
    if (type === ADD_TO_CART) {
      let { book = {}, quantity } = payload;
      quantity = Number(quantity);
      if (state.length + quantity > 15) {
        return;
      }
      const newState = [...state];
      const existedCard = state.find(card => card.isbn === book.isbn);
      if (!existedCard) {
        newState.push({
          isbn: book.isbn,
          title: book.title,
          quantity: quantity,
          price: book.price
        });
      } else {
        for (let card of newState) {
          if (card.isbn === book.isbn) {
            card.quantity += quantity;
            card.price += book.price;
          }
        }
      }
      saveCard(newState);
      return newState;
    }

    if (type === REMOVE_ITEM) {
      const newState = [...state];
      const filterState = newState.filter(card => card.isbn !== payload);
      saveCard(filterState);
      return filterState;
    }

    if (type === REMOVE_CART) {
      removeCard();
      return [];
    }
    return state;
  }
};
