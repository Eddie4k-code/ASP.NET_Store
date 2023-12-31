import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { Agent } from "http";
import { caller } from "../../api/caller";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
/* Handle user state throughout application */

interface AccountState {
    user: User | null;
}

const initalState: AccountState = {
    user: null
}




export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const user = await caller.account.login(data);
            //persist the user in local storage
            localStorage.setItem('user', JSON.stringify(user));

            return user;

        } catch(error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/currentUser',
    async (_, thunkAPI) => {
        //update our user state (either null or fulfilled with user token, email)
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))
        try {
            const user = await caller.account.getCurrentUser();
            //replace old token with updated token!
            localStorage.setItem('user', JSON.stringify(user));

            return user;

        } catch(error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    },
    {   //this condition will allow this thunk to only occur if we have a user in our local storage
        condition: () => {
            if (!localStorage.getItem("user")) {
                return false;
            }
        }
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState: initalState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;

            
        },

        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/catalog')
        },
        
    },
    extraReducers: (builder => {
        
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.user = null;
            localStorage.removeItem("user");
            toast.error("Session expired please login again.");
            
        });


        builder.addCase(signInUser.rejected, (state, action) => {
            state.user = null;
            localStorage.removeItem("user");
            toast.error("Incorrect Username or Password...");
            router.navigate('/login')
            
        });
        

        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });

        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
            console.log(action.payload);
        });
    })
});

export const {setUser, logout} = accountSlice.actions;