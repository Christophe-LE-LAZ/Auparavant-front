import {
    createAction,
    createReducer,
  } from '@reduxjs/toolkit';

  interface filterState {
    area : string,
    department : string,
    city : string,
    type : string
  }

  // Déclaration de l'état initial 
  export const initialState: filterState = {
    area : "",
    department : "",
    city : "",
    type : ""
  };

// Création d'une action pour la mise à jour du state avec la région sélectionnée
    export const setArea = createAction<string>('filter/setArea');

// Création d'une action pour la mise à jour du state avec la région sélectionnée
export const setDepartment = createAction<string>('filter/setDepartment');

// Création d'une action pour la mise à jour du state avec la région sélectionnée
export const setCity = createAction<string>('filter/setCity');

// Création d'une action pour la mise à jour du state avec la région sélectionnée
export const setType = createAction<string>('filter/setType');

// Création d'une action pour la réinitialisation des filtres
export const resetFilters = createAction('filter/resetFilters');
  
  const filterReducer = createReducer(initialState, (builder) => {
        builder
        .addCase(setArea, (state, action) => {
            state.area = action.payload;
            console.log(state.area);
        })
        .addCase(setDepartment, (state, action) => {
            state.department = action.payload;
            console.log(state.department);
        })
        .addCase(setCity, (state, action) => {
            state.city = action.payload;
            console.log(state.city);
        })
        .addCase(setType, (state, action) => {
            state.type = action.payload;
            console.log(state.type);
        })
        .addCase(resetFilters, (state) => {
          state.area = '';
          state.department = '';
          state.city = '';
          state.type = '';
      })
      });
  
  export default filterReducer;
  