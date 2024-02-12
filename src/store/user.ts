import {createReducer, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { ICredentials } from '../types/credentials'
import axios from 'axios';
import { RootState } from '.';

interface UserState {
    logged: boolean;
    id: number | null
    firstname: string;
    credentials : ICredentials;
    loading: boolean;
    error: null | string;
}

export const initialState: UserState = {
    logged: true,
    id: null,
    firstname:'prénom',
    credentials: {
        username: '',
        password: '',
    },
    loading: false,
    error: null
}

export const changeEmail = createAction<string>('user/changeEmail');

export const changePassword = createAction<string>('user/changePassword');

export const login = createAsyncThunk('user/login', async (_, thunkAPI) => {
    // Récupération de la valeur du state via la thunkAPI
    const state = thunkAPI.getState() as RootState;
    // Récupération des valeurs contenues dans credentials
    const credentials = state.user.credentials as ICredentials;
    // Envoi des credentials
    const { data } = await axios.post('http://aurelien-rouchette-maret.vpnuser.lan/apotheosis/what-did-there-use-to-be-back/public/api/login_check', credentials);
    console.log(data);
    // Configuration de l'instance d'axios avec le token reçu
    axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` };
    return data;
  });
  

export const logout = createAction('user/logout');


const userReducer = createReducer(initialState, (builder) => {
    // Changement de la valeur de l'email dans les credentials
    builder.addCase(changeEmail, (state, action) => {
        state.credentials.username = action.payload;
        console.log(state.credentials.username) 
    })
    // Changement de la valeur du password dans les credentials
    .addCase(changePassword, (state, action) =>{ 
        state.credentials.password = action.payload;
        console.log(state.credentials.password)
    })
    // Gestion du cas "pending" de la connexion 
    .addCase(login.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la connexion
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la connexion
      .addCase(login.fulfilled, (state, action) => {
        const { id, firstname } = action.payload;
        state.loading = false;
        state.id = id;
        state.firstname = firstname;
        state.logged = true;
        state.credentials.username = '';
        state.credentials.password = '';
      })
      // Gestion de la déconnexion
      .addCase(logout, (state) => {
        state.id = null
        state.firstname = '';
        state.logged = false;
        // Suppression du token des headers de l'instance axios
        axios.defaults.headers.common = {};
      })
  });
  
  export default userReducer;
  