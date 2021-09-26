import { Dispatch } from 'react';
import { getCoinsList, getQuotes } from 'services/coinMarketCap.service';

import {
  CoinsAction,
  CoinsActionTypes,
  ICoin,
  ISum,
  Transaction,
} from './../../types/coins';

export const fetchCoins = () => {
  return async (dispatch: Dispatch<CoinsAction>) => {
    try {
      const arr: ICoin[] = [];

      await getCoinsList().then((res) => {
        res.data.map((data) => {
          const { id, name, symbol, quote } = data;
          const priceUSD = quote.USD?.price;
          const percentChange24h = quote.USD?.percent_change_24h;

          arr.push({
            id: id,
            name: name,
            symbol: symbol,
            priceUSD: priceUSD,
            percentChange24h: percentChange24h,
          });
        });
      });
      dispatch({ type: CoinsActionTypes.FETCH_ALL_COINS, payload: arr });
    } catch (error) {
      dispatch({
        type: CoinsActionTypes.FETCH_COINS_ERR,
        payload: `FETCH_COINS_ERROR: ${error}`,
      });
    }
  };
};

export const fetchQuotes = (arg: string) => {
  return async (dispatch: Dispatch<CoinsAction>) => {
    try {
      const arr: ICoin[] = [];

      await getQuotes(`${arg}`).then((res) => {
        Object.keys(res.data).map((key) => {
          const { id, name, symbol, quote } = res.data[key];
          const priceUSD = quote.USD?.price;
          const percentChange24h = quote.USD?.percent_change_24h;

          arr.push({
            id: id,
            name: name,
            symbol: symbol,
            priceUSD: priceUSD,
            percentChange24h: percentChange24h,
          });
        });
      });
      dispatch({ type: CoinsActionTypes.FETCH_COINS, payload: arr });
    } catch (error) {
      dispatch({
        type: CoinsActionTypes.FETCH_COINS_ERR,
        payload: `FETCH_COINS_ERROR: ${error}`,
      });
    }
  };
};

export const addUserCoin = (payload: ICoin): CoinsAction => {
  return { type: CoinsActionTypes.ADD_COIN, payload };
};

export const addTransaction = (payload: Transaction): CoinsAction => {
  return { type: CoinsActionTypes.ADD_TRANSACTION, payload };
};

export const addSum = (payload: ISum): CoinsAction => {
  return { type: CoinsActionTypes.ADD_SUM, payload };
};
