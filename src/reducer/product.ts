import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { req } from '~/utils/request';
import { addCategory } from './config';

export type ProductItem = {
    id?: number;
    name: string;
    description: string;
    category_id: number;
    location_id: number;
    img_list: string | Array<string>;
};

type ProductListRet = {
    productList: Array<ProductItem>;
};

export const getProductList = createAsyncThunk<ProductListRet>(
    '/getProductList',
    () => {
        return req('/getProductList', {});
    }
);

export const getProductListByCategoryIdAndLocationId = createAsyncThunk<
    ProductListRet,
    any
>('getProductListByCategoryIdAndLocationId', ({ category_id, location_id }) => {
    return req('/getProductListByCategoryIdAndLocationId', {
        category_id,
        location_id,
    });
});

export const getProductListByLocationId = createAsyncThunk<ProductListRet, any>(
    'getProductListByLocationId',
    (location_id) => {
        return req('/getProductListByLocationId', { location_id });
    }
);

export const addProduct = createAsyncThunk<ProductItem, any>(
    '/addProduct',
    (params) => {
        return req('/addProduct', params);
    }
);

const transformProductList = (productList: Array<ProductItem>) => {
    return productList.map((v) => {
        return {
            ...v,
            img_list: JSON.parse(v.img_list as string),
        };
    });
};

export const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        productList: [] as Array<ProductItem>,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductList.fulfilled, (state, action) => {
            state.productList = transformProductList(
                action.payload.productList
            );
        });
        builder.addCase(
            getProductListByCategoryIdAndLocationId.fulfilled,
            (state, action) => {
                state.productList = transformProductList(
                    action.payload.productList
                );
            }
        );
    },
});

export default productListSlice.reducer;
