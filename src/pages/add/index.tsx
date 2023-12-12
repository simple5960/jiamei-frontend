import { Button, View } from '@tarojs/components';
import React, { useState } from 'react';

import AddProduct from '~/components/AddProduct';

import s from './index.module.less';
import AddCategory from '~/components/AddCategory';
import AddLocation from '~/components/AddLocation';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import Taro from '@tarojs/taro';

export default function Add() {
    const {isLogin} = useSelector((state: RootState) => state.account)
    const typeList = [
        { value: 'product', label: '产品' },
        { value: 'location', label: '位置' },
        { value: 'category', label: '分类' },
    ];
    const [activeType, setActiveType] = useState('product');

    return isLogin ? (
        <View className={s.Add}>
            <View className={s.btnWrapper}>
                {typeList.map((v) => {
                    return (
                        <Button
                            className={`${s.btn} ${
                                activeType === v.value ? s.activeType : ''
                            }`}
                            key={v.value}
                            onClick={() => setActiveType(v.value)}>
                            新增{v.label}
                        </Button>
                    );
                })}
            </View>
            {activeType === 'product' && <AddProduct />}
            {activeType === 'category' && <AddCategory />}
            {activeType === 'location' && <AddLocation />}
        </View>
    ) : (
        <View>
            <View>请登录后再操作</View>
            <Button
                onClick={() => Taro.navigateTo({ url: '/pages/admin/index' })}>
                点此登录
            </Button>
        </View>
    );
}
