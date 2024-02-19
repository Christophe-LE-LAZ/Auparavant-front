import {
    createAction,
    createAsyncThunk,
    createReducer,
  } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILocationCreated } from '../types/location';

export interface LocationState {
    location : ILocationCreated,
    existingLocation : boolean
    }
  
// Déclaration de l'état initial 
  export const initialState : LocationState = {
    location : {
      id: null,
      area: "",
      department: "",
      district: "",
      street: "",
      city: "",
      zipcode: null,
      latitude: "",
      longitude: "",
    },
    existingLocation : false,

  };
  
// Création d'une action pour la mise à jour du state avec la current location
    export const setLocationState = createAction<ILocationCreated>('location/setLocationState');

// Création d'une action pour la mise à jour du state avec la current location
    export const setCoordState = createAction<{lat : number, lng : number}>('location/setCoordState');


  const locationReducer = createReducer(initialState, (builder) => {
    builder.addCase(setLocationState, (state, action) => {
        const { id, area, department, district, street, city, zipcode, latitude, longitude } = action.payload;
        state.location.id = id;
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
      .addCase(setCoordState, (state, action) => {
        const { lat, lng } = action.payload;
        state.location.id = null;
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
      });
  
  export default locationReducer;
  