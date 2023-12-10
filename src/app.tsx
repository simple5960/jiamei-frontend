import React from 'react';
import { Provider } from 'react-redux';

import { getCategoryList, getLocationList } from '~/reducer/config';
import { getProductList } from '~/reducer/product';

import { store } from './store';

import './app.less';
import 'taro-ui/dist/style/index.scss';
import { useDidShow } from '@tarojs/taro';

// @ts-ignore
const dispatch = window.store.dispatch;

function App({ children }) {
    useDidShow(() => {
      dispatch(getLocationList());
      dispatch(getProductList());
      dispatch(getCategoryList());
    })
    return <Provider store={store}>{children}</Provider>;
}

export default App;
