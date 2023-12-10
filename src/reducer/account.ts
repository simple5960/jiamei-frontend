import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { req } from '~/utils/request';

export const AdminLogin = createAsyncThunk<any, any>(
    '/login',
    (params) => {
        return req('/login', params);
    }
);




export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isLogin: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AdminLogin.fulfilled, (state, action) => {
            state.isLogin = action.payload.success === 'success';
        });
    },
});

export default accountSlice.reducer;
