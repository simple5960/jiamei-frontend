import { Button, View, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLocation, getLocationList } from '~/reducer/config';
import { AppDispatch } from '~/store';

export default function AddLocation() {
    // district, street
    const initState = { district: '简阳市', street: '' };
    const [location, setLocation] = useState<any>(initState);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (type, value) => {
        setLocation({ ...location, [type]: value });
    };

    const submit = () => {
        dispatch(addLocation({ ...location })).then(() => {
            setLocation({ ...initState });
            Taro.navigateTo({ url: '/pages/index/index' });
            dispatch(getLocationList());
        });
    };

    return (
        <View>
            <Input
                name="district"
                type="text"
                placeholder="请输入区县名称"
                value={location.district}
                onInput={(e) => handleChange('district', e.detail.value)}
            />
            <Input
                name="street"
                type="text"
                placeholder="请输入街道名称"
                value={location.street}
                onInput={(e) => handleChange('street', e.detail.value)}
            />
            <Button onClick={submit}>提交</Button>
        </View>
    );
}
