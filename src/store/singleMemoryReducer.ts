import {
    createAsyncThunk,
    createReducer,
  } from '@reduxjs/toolkit';

import axios from 'axios';
import { IDataCreated } from '../types/memory';

  interface SingleMemoryState {
    memory : IDataCreated
    loading: boolean;
    error: null | string;
  }

  // Déclaration de l'état initial 
  export const initialState: SingleMemoryState = {
    memory :   {
        id : null,
        title: "",
        content: "",
        picture_date: "",
        main_picture: "",
        location: {
          id: null,
          area: "",
          department: "",
          district: "",
          street: "",
          city: "",
          zipcode: null,
          latitude: "",
          longitude: ""
        },
        picture: [],
        user: {
          id: null,
          firstname: "",
          lastname: "",
          email: "",
          roles: []
        },
        place: {
          id: null,
          name: "",
          type: ""
        }
      },
    loading: false,
    error: null
  };
  
  // Récupération des locations depuis l'API :
  export const fetchSingleMemory = createAsyncThunk(
    'singleMemory/fetchSingleMemory',
    async (memoryId : number) => {
      const { data } = await axios.get(`https://admin.auparavant.fr/api/memory/${memoryId}`);
      return data;
    }
  );

  const singleMemoryReducer = createReducer(initialState, (builder) => {
        builder
          .addCase(fetchSingleMemory.pending, (state) => {
            state.error = null;
            state.loading = true;
          })
          .addCase(fetchSingleMemory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message as string;
          })
          .addCase(fetchSingleMemory.fulfilled, (state, action) => {
            state.loading = false;
            state.memory = action.payload;
          })
      });
  
  export default singleMemoryReducer;
  