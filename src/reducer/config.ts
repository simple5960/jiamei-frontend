import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { req } from '~/utils/request';

type LocationItem = {
    id?: number;
    province?: string;
    city: string;
    district: string;
    street: string;
};

type LocationRet = {
    location: Array<LocationItem>;
};

type CategoryItem = {
    id: number;
    name: string;
};

type CategoryRet = {
    categoryList: Array<CategoryItem>;
};
export const getLocationList = createAsyncThunk<LocationRet>(
    '/getLocation',
    () => {
        return req('/getLocation', {});
    }
);

export const getCategoryList = createAsyncThunk<CategoryRet>(
    '/getCategory',
    () => {
        return req('/getCategory', {});
    }
);

export const addCategory = createAsyncThunk<any, any>(
    '/addCategory',
    (name) => {
        return req('/addCategory', { name });
    }
);

export const addLocation = createAsyncThunk<any, LocationItem>(
    '/addLocation',
    ({ city, district, street }) => {
        return req('/addLocation', { city, district, street });
    }
);

export const configSlice = createSlice({
    name: 'configSlice',
    initialState: {
        locationList: [{ id: -1, street: '全部' }] as Array<LocationItem>,
        categoryList: [{ id: -1, name: '全部' }] as Array<CategoryItem>,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLocationList.fulfilled, (state, action) => {
            if (state.locationList.length === 1) {
                state.locationList.push(...action.payload.location);
            } else {
                state.locationList = action.payload.location;
            }
        });
        builder.addCase(getCategoryList.fulfilled, (state, action) => {
            if (state.categoryList.length === 1) {
                state.categoryList.push(...action.payload.categoryList);
            } else {
                state.categoryList = action.payload.categoryList;
            }
        });
    },
});

export default configSlice.reducer;
