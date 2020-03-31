import { getCard, removeCard, saveCard } from '../libs/card-libs';
export const ADD_TO_CARD = 'ADD_TO_CARD';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REMOVE_CARD = 'REMOVE_CARD';

export default {
  shopingCard: (state = [], { type, payload }) => {
    state = getCard() || [];
    if (type === ADD_TO_CARD) {
      const newState = [...state];
      const existedCard = state.find(card => card.isbn === payload.isbn);
      if (!existedCard) {
        newState.push({
          isbn: payload.isbn,
          title: payload.title,
          quantity: 1,
          price: payload.price
        });
      } else {
        for (let card of newState) {
          if (card.isbn === payload.isbn) {
            card.quantity += 1;
            card.price += payload.price;
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

    if (type === REMOVE_CARD) {
      removeCard();
      return [];
    }
    return state;
  }
};
