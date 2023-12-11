import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Taro from '@tarojs/taro';

import { req } from '~/utils/request';

export const AdminLogin = createAsyncThunk<any, any>(
    '/login',
    (params) => {
        return req('/login', params);
    }
);

const setLoginStaus = (staus) => {
  Taro.setStorageSync('LOGIN', staus)
}

const getLoginStatus = () => {
  return Taro.getStorageSync('LOGIN') === 'login' ? true : false
}



export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isLogin: getLoginStatus(),
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AdminLogin.fulfilled, (state, action) => {
            state.isLogin = action.payload.success === 'success';
            setLoginStaus(state.isLogin ? 'login' : 'unlogin');
        });
    },
});

export default accountSlice.reducer;
