import {
    createAction,
    createAsyncThunk,
    createReducer,
  } from '@reduxjs/toolkit';

  import axios from 'axios';

  import { Memory } from '../types/memory';
  import data from '../data';

  
  interface MemoriesState {
    list: Memory[];
    loading: boolean;
    error: null | string;
  }

  // Déclaration de l'état initial 
  export const initialState: MemoriesState = {
    list: data,
    loading: false,
    error: null
  };
  
  // Récupération des souvenirs depuis l'API :
  export const fetchMemories = createAsyncThunk(
    'memories/fetchMemories',
    async () => {
      const { data } = await axios.get(`URL-API`);
      return data;
    }
  );
  

  const recipesReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(fetchMemories.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchMemories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchMemories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  });
  
  export default recipesReducer;
  