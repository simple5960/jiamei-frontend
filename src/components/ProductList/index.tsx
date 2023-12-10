import { View } from '@tarojs/components';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '~/store';

import s from './index.module.less';
import ProductItem from './ProductItem';

export default function ProductList() {
    const { productList } = useSelector((state: RootState) => state.product);

    const list = useMemo(() => {
        const evenLeft = productList.filter((_, i) => i % 2 === 0) || [];
        const oddRight = productList.filter((_, i) => i % 2 !== 0) || [];
        return {
            evenLeft,
            oddRight,
        };
    }, [productList]);

    return (
        <View className={s.ProductList}>
            <View className={s.left}>
                {list.evenLeft.length > 0 &&
                    list.evenLeft.map((v) => {
                        return <ProductItem item={v} key={v.id} />;
                    })}
            </View>
            <View className={s.right}>
                {list.oddRight.length > 0 &&
                    list.oddRight.map((v) => {
                        return <ProductItem item={v} key={v.id} />;
                    })}
            </View>
        </View>
    );
}
