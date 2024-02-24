import { configureStore } from '@reduxjs/toolkit';
import memoriesReducer from './memoriesReducer'
import userReducer from './userReducer';
import memoryReducer from './createMemoryReducer';
import locationsReducer from './locationsReducer';
import messageReducer from './messageReducer';
import singleMemoryReducer from './singleMemoryReducer';
import filterReducer from './filterReducer';


// Création du store et définition des différents states et de leurs reducers associés

const store = configureStore({
  reducer: {
    memories : memoriesReducer,
    memory: memoryReducer,
    singleMemory : singleMemoryReducer,
    locations: locationsReducer,
    user: userReducer,
    message : messageReducer,
    filter : filterReducer
  },
});

// Déduction du type 'RootState' et 'AppDispatch' depuis le store lui-même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

