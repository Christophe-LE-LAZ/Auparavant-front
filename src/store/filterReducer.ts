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
  input : string,
  searchedInput : string
  filteredData : boolean
  searchedData : boolean
}

// Déclaration de l'état initial 
export const initialState: filterState = {
  area : "",
  department : "",
  city : "",
  type : "",
  years : [1700, 2050],
  input : "",
  searchedInput : "",
  filteredData : false,
  searchedData : false
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

// Création d'une action pour la mise à jour du state avec l'input de la searchbar (onChange)
export const setInput = createAction<string>('filter/setInput');

// Création d'une action pour la mise à jour du state avec l'input de la searchbar (onKeyDown)
export const setSearchedInput = createAction<string>('filter/setSearchedInput');

// Création d'une action pour la réinitialisation des filtres
export const resetFilters = createAction('filter/resetFilters');
  
// Création du reducer
const filterReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setInput, (state, action) => {
    state.input = action.payload;
  })
  .addCase(setSearchedInput, (state, action) => {
    state.searchedInput = action.payload;
    state.filteredData = false;
    state.searchedData = true;
  })
  .addCase(setArea, (state, action) => {
    state.area = action.payload;
    state.filteredData = true;
    state.searchedData = false;
    state.input = ''
  })
  .addCase(setDepartment, (state, action) => {
    state.department = action.payload;
    state.filteredData = true;
    state.searchedData = false;
    state.input = ''
  })
  .addCase(setCity, (state, action) => {
    state.city = action.payload;
    state.filteredData = true;
    state.searchedData = false;
    state.input = ''
  })
  .addCase(setType, (state, action) => {
    state.type = action.payload;
    state.filteredData = true;
    state.searchedData = false;
    state.input = ''
  })
  .addCase(setYears, (state, action) => {
    state.years = action.payload;
    state.filteredData = true;
    state.searchedData = false;
  })
  .addCase(resetFilters, (state) => {
    state.area = '';
    state.department = '';
    state.city = '';
    state.type = '';
    state.years = [1700, 2050];
    state.input = '';
    state.searchedInput = '';
  })
});
  
  export default filterReducer;
  