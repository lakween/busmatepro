import {configureStore} from '@reduxjs/toolkit';

import RootStore from "./reducers/root.store";

export const store = configureStore({
    reducer: RootStore,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
