import React from 'react';
import { Provider } from 'react-redux';

import { getCategoryList, getLocationList } from '~/reducer/config';
import { getProductList } from '~/reducer/product';

import { store } from './store';

import './app.less';
import 'taro-ui/dist/style/index.scss';
import { useDidShow } from '@tarojs/taro';
import VConsole from 'vconsole'; // 引入 vConsole


// @ts-ignore
const dispatch = window.store.dispatch;
if (process.env.NODE_ENV === 'development') {
    // 仅在开发环境下使用 vConsole
    const vConsole = new VConsole();
}

function App({ children }) {
    useDidShow(() => {
      dispatch(getLocationList());
      dispatch(getProductList());
      dispatch(getCategoryList());
    })
    return <Provider store={store}>{children}</Provider>;
}

export default App;
