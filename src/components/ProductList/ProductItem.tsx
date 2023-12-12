import { Image, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductItem as PI, getProductList } from '~/reducer/product';
import { AppDispatch, RootState } from '~/store';

import s from './ProductItem.module.less';
import Taro from '@tarojs/taro';
import { req } from '~/utils/request';

export default function ProductItem({ item, key }: { item: PI; key: any }) {
    const { categoryList, locationList } = useSelector(
        (state: RootState) => state.config
    );
    const {isLogin} = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch<AppDispatch>()

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

    const handleDelete = (e) => {
      e.preventDefault();
      e.stopPropagation();
      Taro.showModal({title: '删除提示', content: '删除后不可恢复, 请谨慎操作', confirmText: '确认删除', success: res => {
        if (res.confirm) {
          req('/deleteProduct', { product_id: item.id }).then((res) => {
              if (res.deleteSuccess) {
                  dispatch(getProductList());
                  Taro.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000,
                  });
              }
          });
        }
      }})
    }
    const handleEdit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      Taro.navigateTo({
          url: `/pages/add/index?pid=${item.id}`,
      });
    }

    return (
        <View className={s.ProductItem} onClick={handleClick}>
            {isLogin && (
                <View className={s.operation}>
                    <View className={s.operationItem} onClick={handleDelete}>
                        删除
                    </View>
                    <View className={s.operationItem} onClick={handleEdit}>
                        编辑
                    </View>
                </View>
            )}
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
