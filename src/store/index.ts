/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Store, AnyAction, compose } from 'redux';
import { load, save } from 'redux-localstorage-simple';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { rootReducer, RootState } from './reducers/index';
let composeEnhancers = compose;

if (typeof window !== 'undefined') {
  composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
}
// create a makeStore function
const makeStore: MakeStore<any> = () =>
  createStore(
    rootReducer,
    load({ states: ['coins.transactions', 'coins.userCoins'], namespace: '' }),
    composeEnhancers(
      applyMiddleware(
        save({
          states: ['coins.transactions', 'coins.userCoins'],
          namespace: '',
        }),
        thunk
      )
    )
  );

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
