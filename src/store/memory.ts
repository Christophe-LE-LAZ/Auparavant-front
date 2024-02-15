import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { TInputNameLocation, TInputNameMemory, TInputNamePlace } from "../types/inputName";
import axios from "axios";
import { ILocation, IMemory, IPlace } from "../types/memory";
import { RootState } from ".";

export interface MemoryState {
  memoryData : { 
    memory : IMemory
    location : ILocation
    place : IPlace
  }
  loading: boolean
  error: string | null
}

  // Déclaration de l'état initial du souvenir à créer
  export const initialState: MemoryState = {
    memoryData: {
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
    },
    loading : false,
    error : null
  };

  // Modification des valeurs du State -> Memory
  export const changeFieldStateMemory = createAction<{
    inputValueM : any;
    inputNameM: TInputNameMemory;
    }>('memory/changeFieldStateMemory');

    // Modification des valeurs du State -> Place
  export const changeFieldStatePlace = createAction<{
    inputValueP : any;
    inputNameP : TInputNamePlace;
  }>('memory/changeFieldStatePlace');

      // Modification des valeurs du State -> Place
  export const changeFieldStateLocation = createAction<{
    inputValueL : any;
    inputNameL : TInputNameLocation;
  }>('memory/changeFieldStateLocation');


  // Création d'un souvenir en BD
  export const createMemory = createAsyncThunk(
    'memory/createMemory',
    async (_, thunkAPI) => {
        // Récupération du state via la thunkAPI
        const state = thunkAPI.getState() as RootState;
        // Envoi de la requête en POST avec le state.memory dans le body
        const { data } = await axios.post(`http://aurelien-rouchette-maret.vpnuser.lan/apotheosis/what-did-there-use-to-be-back/public/api/secure/create/memory-and-location-and-place`, state.memory.memoryData);
        return data;
    }
  )

  const memoryReducer = createReducer(initialState, (builder) => {
    builder.addCase(changeFieldStateMemory, (state, action) => {
        const { inputNameM, inputValueM } = action.payload;
        state.memoryData.memory[inputNameM] = inputValueM;
      })
      .addCase(changeFieldStatePlace, (state, action) => {
        const { inputNameP, inputValueP } = action.payload;
        state.memoryData.place[inputNameP] = inputValueP;
      })
      .addCase(changeFieldStateLocation, (state, action) => {
        const { inputNameL, inputValueL } = action.payload;
        state.memoryData.location[inputNameL] = inputValueL;
      })
      // Gestion du cas "pending" de la création d'un souvenir 
      .addCase(createMemory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la création d'un souvenir 
      .addCase(createMemory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la création d'un souvenir 
      .addCase(createMemory.fulfilled, (state, action) => {
        // const { id, username } = action.payload;
        state.loading = false;
        console.log('success !')
;
    })

  });

  export default memoryReducer;
  