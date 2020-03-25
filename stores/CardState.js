import { getCard, removeCard, saveCard } from '../libs/card-libs';
export const ADD_TO_CARD = 'ADD_TO_CARD';
export const REMOVE_ITEM = 'REMOVE_ITEM';

// const CARDS = [
//   {
//     id: 1,
//     name: 'Nerver eat alone',
//     image: '',
//     link: '',
//     quantity: 2,
//     price: 10000,
//     maxCount: 5
//   },
//   {
//     id: 2,
//     name: 'Trên Đường Băng',
//     image: '',
//     link: '',
//     quantity: 2,
//     price: 10000,
//     maxCount: 5
//   },
//   {
//     id: 3,
//     name: 'Tony Buổi Sáng',
//     image: '',
//     link: '',
//     quantity: 2,
//     price: 10000,
//     maxCount: 5
//   }
// ];

export default {
  shopingCard: (state = [], { type, payload }) => {
    state = getCard() || [];
    if (type === ADD_TO_CARD) {
      const newState = [...state];
      const existedCard = state.find(card => card.id === payload.id);
      if (!existedCard) {
        newState.push({
          id: payload.id,
          name: payload.name,
          quantity: 1,
          price: payload.price
        });
      } else {
        for (let card of newState) {
          if (card.id === payload.id) {
            card.quantity += payload.quantity;
            card.price += payload.price;
          }
        }
      }
      saveCard(newState);
      return newState;
    }

    if (type === REMOVE_ITEM) {
      const newState = [...state];
      const filterState = newState.filter(card => card.id !== payload);
      saveCard(filterState);
      return filterState;
    }
    return state;
  }
};
