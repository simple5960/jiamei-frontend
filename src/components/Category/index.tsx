import { Picker, View } from '@tarojs/components';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '~/store';

import s from './index.module.less';

export default function Category({ setCategory, category_id }) {
    const { categoryList } = useSelector((state: RootState) => state.config);

    const curIdx = categoryList.findIndex((v) => v.id === category_id);
    const handleChange = (target) => {
        const idx = target.detail.value;
        const id = categoryList[idx].id;
        setCategory(id);
    };

    return (
        <Picker
            mode="selector"
            range={categoryList}
            rangeKey="name"
            value={curIdx}
            onClick={() => console.log('click')}
            onCancel={() => console.log('cancel')}
            onChange={handleChange}>
            <View className={s.selector}>
                <View>分类</View>
                <View>{(categoryList[curIdx] || {}).name || '请选择分类'}</View>
            </View>
        </Picker>
    );
}
