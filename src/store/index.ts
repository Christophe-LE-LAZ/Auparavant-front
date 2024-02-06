import { configureStore } from '@reduxjs/toolkit';


// Création du store et définition des différents states et de leurs reducers associés

const store = configureStore({
  reducer: {
  },
});

// Déduction du type 'RootState' et 'AppDispatch' depuis le store lui-même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;