import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { TInputNameMemo } from "../types/inputName";
import axios from "axios";
import { IMemoryToCreate } from "../types/memory";
import { RootState } from ".";


  // Déclaration de l'état initial du souvenir à créer
  export const initialState: IMemoryToCreate = {
    memory : {
        title: "",
        content: "",
        picture_date: "",
        main_picture: "",
        additionnal_pictures: [],
    },
    location : {
        area : "",
        department: "",
        district: "",
        street : "",
        city : "",
        zipcode : null,
        latitude : "",
        longitude : ""
    },
    place : {
        name : "",
        type : ""
    },
  };

// Modification des valeurs du state
export const changeFieldState = createAction<{
    inputValue : string;
    inputName: TInputNameMemo;
    }>('memory/changeFieldState');

// Création d'un souvenir en BD
  export const createMemory = createAsyncThunk(
    'memory/createMemory',
    async (_, thunkAPI) => {
        // Récupération du state via la thunkAPI
        const state = thunkAPI.getState() as RootState;
        // Envoi de la requête en POST avec le state.memory dans le body
        const { data } = await axios.post(`http://aurelien-rouchette-maret.vpnuser.lan/apotheosis/what-did-there-use-to-be-back/public/api/secure/create/memory-and-location-and-place`, state.memory);
        return data;
    }
  )

  const memoryReducer = createReducer(initialState, (builder) => {
    builder.addCase(changeFieldState, (state, action) => {
        const { inputName, inputValue } = action.payload;
        state[inputName] = inputValue;
        console.log(inputName);
        console.log(inputValue);
      })
  });

  export default memoryReducer;
  