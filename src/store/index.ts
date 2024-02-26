import { configureStore } from '@reduxjs/toolkit';
import memoriesReducer from './memoriesReducer'
import userReducer from './userReducer';
import createMemoryReducer from './createMemoryReducer';
import locationsReducer from './locationsReducer';

import randomMemoryReducer from './randomReducer';

import messageReducer from './messageReducer';
import singleMemoryReducer from './singleMemoryReducer';
import filterReducer from './filterReducer';


// Création du store et définition des différents states et de leurs reducers associés

const store = configureStore({
  reducer: {
    memories : memoriesReducer,
    createMemory: createMemoryReducer,
    singleMemory : singleMemoryReducer,
    locations: locationsReducer,
    user: userReducer,

    randomMemoryReducer: randomMemoryReducer,

    message : messageReducer,
    filter : filterReducer

  },
});

// Déduction du type 'RootState' et 'AppDispatch' depuis le store lui-même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

