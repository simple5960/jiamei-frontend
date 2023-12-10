import { Button, Input, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, getCategoryList } from '~/reducer/config';
import { AppDispatch } from '~/store';

export default function AddCategory() {
    const [category, setCategory] = useState<any>('');
    const dispatch = useDispatch<AppDispatch>();

    const submit = () => {
        dispatch(addCategory(category)).then(() => {
            setCategory('');
            Taro.navigateTo({ url: '/pages/index/index' });
            dispatch(getCategoryList());
        });
    };
    return (
        <View>
            <Input
                name="category"
                type="text"
                placeholder="请输入产品分类名称"
                value={category}
                onInput={(e) => setCategory(e.detail.value)}
            />
            <Button onClick={submit}>提交</Button>
        </View>
    );
}
