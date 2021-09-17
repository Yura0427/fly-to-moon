import { combineReducers } from 'redux';

import { coinsReducer } from './coinsReducer';

export const rootReducer = combineReducers({
  coins: coinsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
