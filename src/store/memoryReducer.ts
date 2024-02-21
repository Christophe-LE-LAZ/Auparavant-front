import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { TInputNameLocation, TInputNameMemory, TInputNamePlace } from "../types/inputName";
import { IMemoryToCreate, IPlaceToCreate } from "../types/memory";
import { ILocationCreated, ILocationToCreate } from "../types/location";
import { RootState } from ".";

export interface MemoryState {

  memory : IMemoryToCreate
  place : IPlaceToCreate
  location : ILocationToCreate
  existingLocation : boolean
  locationId: number | null
  just_deleted : boolean
  loading: boolean
  error: string | null
  message: string
}

  // Déclaration de l'état initial du souvenir à créer
  export const initialState: MemoryState = {
    memory : {
      title: "",
      content: "",
      picture_date: "",
      main_picture: "",
      additionnal_pictures: undefined,
    },
    place : {
      name : "",
      type : ""
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
    existingLocation : false,
    locationId : null,
    just_deleted : false,
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

  // Création d'une action pour la mise à jour du state avec la current location
  export const setLocationState = createAction<ILocationCreated>('memory/setLocationState');

  // Création d'une action pour la mise à jour du state avec la current location
  export const setCoordState = createAction<{lat : number, lng : number}>('memory/setCoordState');
  
  // Création d'un souvenir en BDD : memory + place + location
  export const createMemoryWithLocation = createAsyncThunk(
    'memory/createMemoryWithLocation',
    async (_, thunkAPI) => {
      // Récupération du state via la thunkAPI
      const state = thunkAPI.getState() as RootState;
      // Création du body de la requête
      const memory = state.memory.memory;
      const place = state.memory.place;
      const location = state.memory.location;
      const memoryWithLocation = {memory, place, location};
      console.log(memoryWithLocation);
      // Envoi de la requête en POST avec le state.memory dans le body
      const { data } = await axios.post(`https://admin.auparavant.fr/api/secure/create/memory-and-location-and-place`, memoryWithLocation);
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
        const memory = state.memory.memory;
        const name = state.memory.place.name;
        const type = state.memory.place.type;
        const place = {create_new_place : true, name, type};
        const location = {id : state.memory.locationId};
        const memoryWithoutLocation = {memory, place, location};
        console.log(memoryWithoutLocation);
        // Envoi de la requête en POST avec le state.memory dans le body
        const { data } = await axios.post(`https://admin.auparavant.fr/api/secure/create/memory-and-place`, memoryWithoutLocation);
        return data;
      }
    )

    // Suppression d'un souvenir
    export const deleteMemory = createAsyncThunk(
      'memory/deleteMemory',
      async (memoryID : number, thunkAPI) => {
        // Récupération du state via la thunkAPI
        const state = thunkAPI.getState() as RootState;
        // Envoi de la requête en DELETE avec l'ID du souvenir en endpoint'
        const { data } = await axios.delete(`https://admin.auparavant.fr/api/secure/delete/memory/${memoryID}`);
        return data;
      }
        )
  const memoryReducer = createReducer(initialState, (builder) => {
    // Modification du state suite à une nouvelle inputValue dans le fieldset memory
    builder.addCase(changeFieldStateMemory, (state, action) => {
        const { inputNameM, inputValueM } = action.payload;
        state.memory[inputNameM] = inputValueM;
        console.log(state.memory.title)
      })
      // Modification du state suite à une nouvelle inputValue dans le fieldset place
      .addCase(changeFieldStatePlace, (state, action) => {
        const { inputNameP, inputValueP } = action.payload;
        state.place[inputNameP] = inputValueP;
        console.log(state.place.name)
      })
      // Modification du state suite à une nouvelle inputValue dans le fieldset location
      .addCase(changeFieldStateLocation, (state, action) => {
        const { inputNameL, inputValueL } = action.payload;
        state.location[inputNameL] = inputValueL;
        console.log(state.location.area)
      })
      // Modification du state "location" suite au clic sur un pointeur (pour createMemoryWithoutLocation)
      .addCase(setLocationState, (state, action) => {
        const { id, area, department, district, street, city, zipcode, latitude, longitude } = action.payload;
        state.locationId = id;
        state.location.area = area;
        state.location.department = department;
        state.location.district = district;
        state.location.street = street;
        state.location.city = city;
        state.location.zipcode = zipcode;
        state.location.latitude = latitude;
        state.location.longitude = longitude;
        state.existingLocation = true;
      })
      // Modification du state "location" suite au clic sur la carte (pour createMemoryWithLocation)
      .addCase(setCoordState, (state, action) => {
        const { lat, lng } = action.payload;
        state.locationId = null;
        state.location.area = "";
        state.location.department = "";
        state.location.district = "";
        state.location.street = "";
        state.location.city = "";
        state.location.zipcode = null;
        state.location.latitude = String(lat);
        state.location.longitude = String(lng);
        state.existingLocation = false;
      })
      // Gestion du cas "pending" de la création d'un souvenir + place + location
      .addCase(createMemoryWithLocation.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la création d'un souvenir + place + location
      .addCase(createMemoryWithLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la création d'un souvenir + place + location
      .addCase(createMemoryWithLocation.fulfilled, (state, action) => {
        // const { id, username } = action.payload;
        state.loading = false;
        console.log('success !');
      })
      // Gestion du cas "pending" de la création d'un souvenir + place + location
      .addCase(createMemoryWithoutLocation.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la création d'un souvenir + place + location
      .addCase(createMemoryWithoutLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la création d'un souvenir + place + location
      .addCase(createMemoryWithoutLocation.fulfilled, (state, action) => {
        // const { id, username } = action.payload;
        state.loading = false;
        console.log('success !');
      })
      // Gestion du cas "pending" de la suppression d'un souvenir
      .addCase(deleteMemory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la suppression d'un souvenir
      .addCase(deleteMemory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la suppression d'un souvenir
      .addCase(deleteMemory.fulfilled, (state, action) => {
        // const { id, username } = action.payload;
        state.loading = false;
        state.just_deleted = true;
        state.message = "Le souvenir a bien été supprimé."
        console.log('success !');
      })
  });

  export default memoryReducer;
  