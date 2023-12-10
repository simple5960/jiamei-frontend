import { configureStore } from '@reduxjs/toolkit';

import reducer from '~/reducer';

console.log('reducers', reducer);

export const store = configureStore({
    reducer,
});

// @ts-ignore
window.store = store;

export type StoreType = typeof store;

export type RootState = ReturnType<StoreType['getState']>;

export type AppDispatch = typeof store.dispatch;
