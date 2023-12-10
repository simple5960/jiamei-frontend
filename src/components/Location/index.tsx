import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '~/store';

import s from './inded.module.less';
import { Picker, View } from '@tarojs/components';

export default function Location({ setLocation, location_id }) {
    const { locationList } = useSelector((state: RootState) => state.config);
    const curIdx = locationList.findIndex((v) => v.id === location_id);
    console.log('locationList', locationList);

    const handleChange = (target) => {
        const idx = target.detail.value;
        const id = locationList[idx].id;
        setLocation(id);
    };

    return (
        <Picker
            mode="selector"
            range={locationList}
            rangeKey="street"
            onChange={handleChange}>
            <View className={s.selector}>
                <View>街道</View>
                <View>
                    {(locationList[curIdx] || {}).street || '请选择街道'}
                </View>
            </View>
        </Picker>
    );
}
