import { combineReducers, getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import uiReducer from './ui';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['ui'],
};

const rootReducer = combineReducers({
  ui: uiReducer,
});

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store, {}, () => {
  console.log('Store rehydration finished');
});

export default store;

export type RootState = ReturnType<typeof store.getState>;