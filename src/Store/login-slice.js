import {createSlice} from "@reduxjs/toolkit";

const username = localStorage.getItem('username');

const loginSlice = createSlice({
    name: 'ui',
    initialState: {
        userName: username
    },
    reducers: {
        login(state, action){
            state.userLogged = true;
            state.userName = action.payload;
        },
        logout(state){
            state.userLogged = false;
            state.userName = '';
        },

    }
})

export const loginActions = loginSlice.actions;

export default loginSlice;