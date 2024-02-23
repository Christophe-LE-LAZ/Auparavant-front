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
  locationToCreate : boolean
  locationId: number | null
  firstRequestOk : boolean
  main_picture : File | undefined
  memoryId: number | null
  just_created : boolean
  just_deleted : boolean
  loading: boolean
  error: string | null
}

  // Déclaration de l'état initial du souvenir à créer
  export const initialState: MemoryState = {
    memory : {
      title: "",
      content: "",
      picture_date: "",
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
      zipcode : undefined,
      latitude : "",
      longitude : ""
    },
    existingLocation : false,
    locationToCreate : false,
    locationId : null,
    firstRequestOk : false,
    main_picture : undefined,
    memoryId : null,
    just_created : false,
    just_deleted : false,
    loading : false,
    error : null,
  };

  // Création d'une action pour la modification des valeurs du State -> Memory
  export const changeFieldStateMemory = createAction<{
    inputValueM : string & (string[] | undefined);
    inputNameM: TInputNameMemory;
    }>('createMemory/changeFieldStateMemory');

  // Création d'une action pour la modification des valeurs du State -> Place
  export const changeFieldStatePlace = createAction<{
    inputValueP : string;
    inputNameP : TInputNamePlace;
  }>('createMemory/changeFieldStatePlace');

  // Création d'une action pour la modification des valeurs du State -> Location
  export const changeFieldStateLocation = createAction<{
    inputValueL : string & (number| undefined);
    inputNameL : TInputNameLocation;
  }>('createMemory/changeFieldStateLocation');

  // Création d'une action pour la mise à jour du state avec la current location
  export const setLocationState = createAction<ILocationCreated>('memory/setLocationState');

  // Création d'une action pour la mise à jour du state avec la current location
  export const setCoordState = createAction<{lat : number, lng : number}>('memory/setCoordState');
  
  // Création d'un souvenir en BDD : memory + place + location
  export const createMemoryWithLocation = createAsyncThunk(
    'createMemory/createMemoryWithLocation',
    async (_, thunkAPI) => {
      // Récupération du state via la thunkAPI
      const state = thunkAPI.getState() as RootState;
      // Création du body de la requête
      const memory = state.createMemory.memory;
      const place = state.createMemory.place;
      const location = state.createMemory.location;
      const memoryWithLocation = {memory, place, location};
      console.log(memoryWithLocation);
      // Envoi de la requête en POST avec le state.memory dans le body
      const { data } = await axios.post(`https://admin.auparavant.fr/api/secure/create/memory-and-location-and-place`, memoryWithLocation);
      return data;
    }
  )

    // Création d'un souvenir en BDD : memory + place
    export const createMemoryWithoutLocation = createAsyncThunk(
      'createMemory/createMemoryWithoutLocation',
      async (_, thunkAPI) => {
        // Récupération du state via la thunkAPI
        const state = thunkAPI.getState() as RootState;
        // Création du body de la requête
        const memory = state.createMemory.memory;
        const name = state.createMemory.place.name;
        const type = state.createMemory.place.type;
        const place = {create_new_place : true, name, type};
        const location = {id : state.createMemory.locationId};
        const memoryWithoutLocation = {memory, place, location};
        console.log(memoryWithoutLocation);
        // Envoi de la requête en POST avec le state.memory dans le body
        const { data } = await axios.post(`https://admin.auparavant.fr/api/secure/create/memory-and-place`, memoryWithoutLocation);
        return data;
      }
    )

    // TODO : Upload de la main picture

    // Upload de la main Picture
    export const uploadMainPicture = createAsyncThunk(
      'createMemory/uploadMainPicture',
      async (mainPicture : File, thunkAPI) => {
        // Récupération du state via la thunkAPI
        const state = thunkAPI.getState() as RootState;
        // Création du body de la requête
        const memoryID = state.createMemory.memoryId
        const picture = state.createMemory.memory;
        const memory = {id : memoryID};
        const main_picture = {picture, memory}
        // Envoi de la requête en POST avec la main picture et l'id du souvenir dans le body
        const { data } = await axios.post(`https://admin.auparavant.fr/api/secure/upload_update/main_picture/${memoryID}`, main_picture);
        return data;
      }
    )

  // Création d'une action pour le nettoyage du state
  export const clearCreateMemoryState = createAction('memory/clearMemoryState');
  
  const memoryReducer = createReducer(initialState, (builder) => {
      builder
      // Modification du state suite à une nouvelle inputValue dans le fieldset memory
      .addCase(changeFieldStateMemory, (state, action) => {
        const { inputNameM, inputValueM } = action.payload;
        state.memory[inputNameM] = inputValueM;
      })
      // Modification du state suite à une nouvelle inputValue dans le fieldset place
      .addCase(changeFieldStatePlace, (state, action) => {
        const { inputNameP, inputValueP } = action.payload;
        state.place[inputNameP] = inputValueP;
      })
      // Modification du state suite à une nouvelle inputValue dans le fieldset location
      .addCase(changeFieldStateLocation, (state, action) => {
        const { inputNameL, inputValueL } = action.payload;
        state.location[inputNameL] = inputValueL;
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
        state.locationToCreate = false;
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
        state.location.zipcode = undefined;
        state.location.latitude = String(lat);
        state.location.longitude = String(lng);
        state.existingLocation = false;
        state.locationToCreate = true;
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
        const { id } = action.payload.memory;
        state.firstRequestOk = true;
        state.memoryId = id;
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
        const { id } = action.payload.memory;
        state.firstRequestOk = true;
        state.memoryId = id;
      })
      // TODO UPLOAD MAIN PICTURE
      // Gestion du cas "pending" de l'upload de la main_picture
      .addCase(uploadMainPicture.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de l'upload de la main_picture
      .addCase(uploadMainPicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de l'upload de la main_picture
      .addCase(uploadMainPicture.fulfilled, (state) => {
        state.loading = false;
        state.just_created = true;
      })
      // Remise à zéro du state
      .addCase(clearCreateMemoryState, (state) => {
        state.memory.title = "";
        state.memory.content = "";
        state.memory.picture_date = "";
        state.place.name = "";
        state.place.type = "";
        state.location.area = "";
        state.location.department = "";
        state.location.district = "";
        state.location.street = "";
        state.location.city = "";
        state.location.zipcode = undefined;
        state.location.latitude = "";
        state.location.longitude = "";
        state.existingLocation = false;
        state.locationToCreate = false;
        state.locationId = null;
        state.just_created = false;
        state.just_deleted = false;
        state.error = "";
        state.loading = false;
      })
  });

  export default memoryReducer;
  