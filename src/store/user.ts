import {createReducer, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { ICredentials } from '../types/credentials'
import axios from 'axios';
import { RootState } from '.';
import { TInputNameCred } from '../types/inputName';

interface UserState {
    logged: boolean;
    id: number | null
    username: string;
    email: string;
    lastname: string;
    credentials : ICredentials;
    loading: boolean;
    error: null | string;
}

export const initialState: UserState = {
  logged: false,
  id: null,
  username:'',
  email: '',
  lastname: '',
  credentials: {
      username: '',
      password: '',
  },
  loading: false,
  error: null
}


export const changeFieldState = createAction<{
  inputValue : string;
  inputName: TInputNameCred;
}>('user/changeFieldState');

export const login = createAsyncThunk('user/login', async (_, thunkAPI) => {
    // Récupération de la valeur du state via la thunkAPI
    const state = thunkAPI.getState() as RootState;
    // Récupération des valeurs contenues dans credentials
    const credentials = state.user.credentials as ICredentials;
    // Envoi des credentials
    const { data } = await axios.post('http://13.60.26.88/api/login_check', credentials);
    // Configuration de l'instance d'axios avec le token reçu
    axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` };
    return data.data;
  });
  

export const logout = createAction('user/logout');


const userReducer = createReducer(initialState, (builder) => {
    // Changement de la valeur de l'email et du password dans les credentials
    builder.addCase(changeFieldState, (state, action) => {
      const { inputName, inputValue } = action.payload;
      state.credentials[inputName] = inputValue;
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
        const { id, username, email, lastname } = action.payload;
        console.log(id);
        console.log(username)
        console.log(action.payload);
        state.loading = false;
        state.id = id;
        state.username = username;
        state.email = email;
        state.lastname = lastname;
        state.logged = true;
        state.credentials.username = '';
        state.credentials.password = '';
    })
    
    
      // Gestion de la déconnexion
      .addCase(logout, (state) => {
        state.id = null
        state.username = '';
        state.logged = false;
        // Suppression du token des headers de l'instance axios
        axios.defaults.headers.common = {};
      })
  });
  
  export default userReducer;
  