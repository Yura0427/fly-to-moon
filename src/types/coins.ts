export interface ICoin {
  id: number;
  name: string;
  symbol: string;
  priceUSD: number;
  percentChange24h: number;
}

export interface CoinsState {
  userCoins: ICoin[];
  err: string;
  transactions: Transaction[];
  sum: ISum[] | [];
}

export interface Transaction {
  id: number;
  holdings: number;
  currentPrice: number;
}

export interface ISum {
  id: number;
  sum: number;
}

export enum CoinsActionTypes {
  FETCH_COINS = 'FETCH_COINS',
  FETCH_COINS_ERR = 'FETCH_COINS_ERR',
  ADD_COIN = 'ADD_COIN',
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  ADD_SUM = 'ADD_SUM',
}

interface FetchCoinsAction {
  type: CoinsActionTypes.FETCH_COINS;
  payload: ICoin[];
}
interface FetchCoinsErrorAction {
  type: CoinsActionTypes.FETCH_COINS_ERR;
  payload: string;
}

interface AddCoinAction {
  type: CoinsActionTypes.ADD_COIN;
  payload: ICoin;
}

interface AddTransactionAction {
  type: CoinsActionTypes.ADD_TRANSACTION;
  payload: Transaction;
}

interface AddSumAction {
  type: CoinsActionTypes.ADD_SUM;
  payload: ISum;
}

export type CoinsAction =
  | FetchCoinsAction
  | FetchCoinsErrorAction
  | AddCoinAction
  | AddTransactionAction
  | AddSumAction;
