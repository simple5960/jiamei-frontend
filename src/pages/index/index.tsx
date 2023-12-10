import { ScrollView, View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';

import ProductList from '~/components/ProductList';

import Category from '~/components/Category';
import Location from '~/components/Location';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/store';
import {
    getProductList,
    getProductListByCategoryIdAndLocationId,
} from '~/reducer/product';

import s from './index.module.less';
import { getEleRect } from '~/utils';
import Desc from '~/components/Desc';

export default function Index() {
    const initState = {
        category_id: -1,
        location_id: -1,
    };
    const dispatch = useDispatch<AppDispatch>();
    const [classifState, setClassifyState] = useState(initState);
    const [height, setHeight] = useState(0);

    const setLocation = (id) => {
        setClassifyState({ ...classifState, location_id: id });
        dispatch(
            getProductListByCategoryIdAndLocationId({
                category_id:
                    classifState.category_id === -1
                        ? null
                        : classifState.category_id,
                location_id: id === -1 ? null : id,
            })
        );
    };

    const setCategory = (id) => {
        setClassifyState({ ...classifState, category_id: id });
        dispatch(
            getProductListByCategoryIdAndLocationId({
                location_id:
                    classifState.location_id === -1
                        ? null
                        : classifState.location_id,
                category_id: id === -1 ? null : id,
            })
        );
    };

    const clear = () => {
        setClassifyState(initState);
        dispatch(getProductList());
    };

    useEffect(() => {
        getEleRect('#top').then((res: any) => {
            setHeight(res.height);
        });
    }, []);

    return (
        <ScrollView className={s.index} scrollY>
            <Desc />
            <View className={s.top} id="top">
                <Category
                    setCategory={setCategory}
                    category_id={classifState.category_id}
                />
                <Location
                    setLocation={setLocation}
                    location_id={classifState.location_id}
                />
                {/* <View className="common_button" onClick={clear}>
                    清空选择条件
                </View> */}
            </View>
            <View className={s.content}>
                <ProductList />
            </View>
        </ScrollView>
    );
}
