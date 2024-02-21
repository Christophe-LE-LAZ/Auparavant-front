import { configureStore } from '@reduxjs/toolkit';
import memoriesReducer from './memoriesReducer'
import userReducer from './userReducer';
import memoryReducer from './memoryReducer';
import locationsReducer from './locationsReducer';
import messageReducer from './messageReducer';

// Création du store et définition des différents states et de leurs reducers associés

const store = configureStore({
  reducer: {
    memories : memoriesReducer,
    memory: memoryReducer,
    locations: locationsReducer,
    user: userReducer,
    message : messageReducer
  },
});

// Déduction du type 'RootState' et 'AppDispatch' depuis le store lui-même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

