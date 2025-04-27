import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import transactionReducer from './slices/transactionSlice';

// Middleware para sincronizar el estado con localStorage
const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('appState', JSON.stringify(state));
  return result;
};

// Cargar estado inicial desde localStorage
const rehydrateState = () => {
  const savedState = localStorage.getItem('appState');
  return savedState ? JSON.parse(savedState) : undefined;
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    transaction: transactionReducer,
  },
  preloadedState: rehydrateState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;