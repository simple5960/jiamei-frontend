import { Image, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import React from 'react';
import { useSelector } from 'react-redux';

import { ProductItem as PI } from '~/reducer/product';
import { RootState } from '~/store';

import s from './ProductItem.module.less';
import Taro from '@tarojs/taro';

export default function ProductItem({ item, key }: { item: PI; key: any }) {
    const { categoryList, locationList } = useSelector(
        (state: RootState) => state.config
    );

    const getCategoryLabel = (id) => {
        const res = categoryList.find((v) => v.id === id);
        return res ? res.name : '';
    };
    const getLocaltionLabel = (id) => {
        const res = locationList.find((v) => v.id === id);
        return res ? `${res.district}-${res.street}` : '';
    };

    const handleClick = () => {
        Taro.navigateTo({
            url: `/pages/detail/index?pid=${item.id}`,
        });
    };

    return (
        <View className={s.ProductItem} onClick={handleClick}>
            <View className={s.contentWrapper}>
                <Text className={s.title}>{item.name}</Text>
                {/* {img && <Image className={s.image} src={img} />} */}
                {item.img_list[0] && (
                    <Swiper>
                        {(item.img_list as Array<string>).map((v) => {
                            return (
                                <SwiperItem key={v}>
                                    <Image className={s.image} src={v} />
                                </SwiperItem>
                            );
                        })}
                    </Swiper>
                )}
                <Text className={s.text}>{item.description}</Text>
            </View>
            <Text className={s.categoryTag}>
                {getCategoryLabel(item.category_id)}
            </Text>
            <Text className={s.locationTag}>
                {getLocaltionLabel(item.location_id)}
            </Text>
        </View>
    );
}
