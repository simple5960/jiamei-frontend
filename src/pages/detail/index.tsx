import React, { useEffect } from 'react';

import s from './index.module.less';
import { useQuery } from '~/utils/route';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getDetail } from '~/reducer/product';

export default function Detail() {
    const { pid } = useQuery();
    const { productDetail } = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch<AppDispatch>()
    // const detail = useMemo(() => {
    //     return productList.find((v) => v.id === Number(pid));
    // }, [pid, productList]);

    const handlePreview = (src) => {
        // 获取图片信息。网络图片需先配置download域名才能生效。
        Taro.previewImage({
            current: src,
            urls: [src],
            showmenu: true
        });
    };

    useEffect(() => {
      dispatch(getDetail({product_id: pid}))
    }, [])

    return (
        <View className={s.Detail}>
            <View className={s.title}>{productDetail?.name}</View>
            <View className={s.content}>{productDetail?.description}</View>
            {productDetail?.img_list &&
                (productDetail.img_list as Array<string>).map((v) => {
                    return (
                        v && (
                            <Image
                                className={s.image}
                                src={v}
                                onClick={() => handlePreview(v)}
                                mode="widthFix"
                            />
                        )
                    );
                })}
        </View>
    );
}
