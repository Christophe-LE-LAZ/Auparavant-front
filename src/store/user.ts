import {createReducer} from '@reduxjs/toolkit';
import { ICredentials } from '../types/credentials'

interface UserState {
    logged: boolean;
    credentials : ICredentials;
    pseudo : string | null; 
}

export const initialState: UserState = {
    logged: false,
    credentials: {
        email: '',
        password: '',
    },
    pseudo : null,
}

const userReducer = createReducer(initialState, ()=>{});

export default userReducer;