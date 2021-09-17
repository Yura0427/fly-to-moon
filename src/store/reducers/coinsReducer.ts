/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/no-nested-ternary */
import { CoinsAction, CoinsActionTypes, CoinsState } from './../../types/coins';
export const initialState: CoinsState = {
  userCoins: [],
  userCoinsID: [],
  err: '',
  transactions: [],
  sum: [],
};

export const coinsReducer = (
  state = initialState,
  action: CoinsAction
): CoinsState => {
  switch (action.type) {
    case CoinsActionTypes.FETCH_COINS:
      // eslint-disable-next-line no-console
      console.log('FETCH_COINS', action.payload);

      return {
        ...state,
        err: '',
        userCoins: action.payload,
      };
    case CoinsActionTypes.FETCH_COINS_ERR:
      // eslint-disable-next-line no-console
      console.log('FETCH_COINS_ERR', action.payload);

      return {
        ...state,
        err: action.payload,
      };
    case CoinsActionTypes.ADD_COIN:
      // eslint-disable-next-line no-console
      console.log('ADD_COIN', action.payload);

      return {
        ...state,
        userCoins: [...state.userCoins, action.payload],
      };
    case CoinsActionTypes.ADD_TRANSACTION:
      // eslint-disable-next-line no-console
      console.log('ADD_TRANSACTION', action.payload);

      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case CoinsActionTypes.ADD_SUM:
      // eslint-disable-next-line no-console
      console.log('ADD_SUM');

      return {
        ...state,
        // eslint-disable-next-line no-nested-ternary
        sum: !state.sum?.length
          ? [action.payload]
          : state.sum?.some((item) => item.id === action.payload.id)
          ? state.sum.map((item: any) => {
              if (item.id === action.payload.id) return action.payload;

              return item;
            })
          : [...state.sum, action.payload],
      };
    default:
      return state;
  }
};