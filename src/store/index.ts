import { configureStore } from '@reduxjs/toolkit';
import memoriesReducer from './memories'
import userReducer from './user';
import memoryReducer from './memory';

// Création du store et définition des différents states et de leurs reducers associés

const store = configureStore({
  reducer: {
    memories : memoriesReducer,
    memory: memoryReducer,
    user: userReducer
  },
});

// Déduction du type 'RootState' et 'AppDispatch' depuis le store lui-même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

