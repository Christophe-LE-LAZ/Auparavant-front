import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { TInputNameLocation, TInputNameMemory, TInputNamePlace } from "../types/inputName";
import { IMemoryToCreate, IPlaceToCreate } from "../types/memory";
import { ILocationToCreate } from "../types/location";
import { RootState } from ".";

export interface MemoryState {
  memoryData : { 
    memory : IMemoryToCreate
    location : ILocationToCreate
    place : IPlaceToCreate
  }
  loading: boolean
  error: string | null
  message: string
}

  // Déclaration de l'état initial du souvenir à créer
  export const initialState: MemoryState = {
    memoryData: {
      memory : {
        title: "",
        content: "",
        picture_date: "",
        main_picture: "",
        additionnal_pictures: undefined,
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
    error : null,
    message: ""

  };

  // Création d'une action pour la modification des valeurs du State -> Memory
  export const changeFieldStateMemory = createAction<{
    inputValueM : string & (string[] | undefined);
    inputNameM: TInputNameMemory;
    }>('memory/changeFieldStateMemory');

  // Création d'une action pour la modification des valeurs du State -> Place
  export const changeFieldStatePlace = createAction<{
    inputValueP : string;
    inputNameP : TInputNamePlace;
  }>('memory/changeFieldStatePlace');

  // Création d'une action pour la modification des valeurs du State -> Location
  export const changeFieldStateLocation = createAction<{
    inputValueL : string & (number| undefined);
    inputNameL : TInputNameLocation;
  }>('memory/changeFieldStateLocation');


  // Création d'un souvenir en BDD : memory + place + location
  export const createMemoryWithLocation = createAsyncThunk(
    'memory/createMemoryWithLocation',
    async (_, thunkAPI) => {
        // Récupération du state via la thunkAPI
        const state = thunkAPI.getState() as RootState;
        const memoryData1 = state.memory.memoryData;
        // Envoi de la requête en POST avec le state.memory dans le body
        const { data } = await axios.post(`http://auparavant.fr/api/secure/create/memory-and-location-and-place`, memoryData1);
        return data;
    }
  )

    // Création d'un souvenir en BDD : memory + place
    export const createMemoryWithoutLocation = createAsyncThunk(
      'memory/createMemoryWithoutLocation',
      async (_, thunkAPI) => {
          // Récupération du state via la thunkAPI
          const state = thunkAPI.getState() as RootState;
          // Création du body de la requête
          const memoryObj = state.memory.memoryData.memory;
          const placeObj = state.memory.memoryData.place;
          const memoryData2 = {memoryObj, placeObj};
          // Envoi de la requête en POST avec le state.memory dans le body
          const { data } = await axios.post(`http://auparavant.fr/api/secure/create/memory-and-place`, memoryData2);
          return data;
      }
    )

  const memoryReducer = createReducer(initialState, (builder) => {
    // Modification du state suite à une nouvelle inputValue dans le fieldset memory
    builder.addCase(changeFieldStateMemory, (state, action) => {
        const { inputNameM, inputValueM } = action.payload;
        state.memoryData.memory[inputNameM] = inputValueM;
      })
    // Modification du state suite à une nouvelle inputValue dans le fieldset place
      .addCase(changeFieldStatePlace, (state, action) => {
        const { inputNameP, inputValueP } = action.payload;
        console.log(inputValueP)
        state.memoryData.place[inputNameP] = inputValueP;
      })
    // Modification du state suite à une nouvelle inputValue dans le fieldset location
      .addCase(changeFieldStateLocation, (state, action) => {
        const { inputNameL, inputValueL } = action.payload;
        console.log(inputValueL)
        state.memoryData.location[inputNameL] = inputValueL;
      })
      // Gestion du cas "pending" de la création d'un souvenir 
      .addCase(createMemoryWithLocation.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la création d'un souvenir 
      .addCase(createMemoryWithLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la création d'un souvenir 
      .addCase(createMemoryWithLocation.fulfilled, (state, action) => {
        // const { id, username } = action.payload;
        state.loading = false;
        console.log('success !')
;
    })

  });

  export default memoryReducer;
  