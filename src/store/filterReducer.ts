import {
    createAction,
    createReducer,
  } from '@reduxjs/toolkit';

  interface filterState {
    area : string,
    department : string,
    city : string,
    type : string,
    years : number[],
    searchInput : string
  }

  // Déclaration de l'état initial 
  export const initialState: filterState = {
    area : "",
    department : "",
    city : "",
    type : "",
    years : [1700, 2050],
    searchInput : ""
  };

// Création d'une action pour la mise à jour du state avec la région sélectionnée
export const setArea = createAction<string>('filter/setArea');

// Création d'une action pour la mise à jour du state avec la région sélectionnée
export const setDepartment = createAction<string>('filter/setDepartment');

// Création d'une action pour la mise à jour du state avec la région sélectionnée
export const setCity = createAction<string>('filter/setCity');

// Création d'une action pour la mise à jour du state avec la région sélectionnée
export const setType = createAction<string>('filter/setType');

// Création d'une action pour la mise à jour du state avec la période sélectionnée
export const setYears = createAction<number[]>('filter/setYears');

// Création d'une action pour la mise à jour du state avec l'input de la searchbar
export const setSearchInput = createAction<string>('filter/setSearch');

// Création d'une action pour la réinitialisation des filtres
export const resetFilters = createAction('filter/resetFilters');
  
  const filterReducer = createReducer(initialState, (builder) => {
        builder
        .addCase(setSearchInput, (state, action) => {
          state.searchInput = action.payload;
        })
        .addCase(setArea, (state, action) => {
            state.area = action.payload;
        })
        .addCase(setDepartment, (state, action) => {
            state.department = action.payload;
        })
        .addCase(setCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(setType, (state, action) => {
            state.type = action.payload;
        })
        .addCase(setYears, (state, action) => {
          state.years = action.payload;
      })
        .addCase(resetFilters, (state) => {
          state.area = '';
          state.department = '';
          state.city = '';
          state.type = '';
          state.years = [1700, 2050]
      })
    });
  
  export default filterReducer;
  