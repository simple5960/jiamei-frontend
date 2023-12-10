import React, { useMemo } from 'react';

import s from './index.module.less';
import { useQuery } from '~/utils/route';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

export default function Detail() {
    const { pid } = useQuery();
    const { productList } = useSelector((state: RootState) => state.product);
    const detail = useMemo(() => {
        return productList.find((v) => v.id === Number(pid));
    }, [pid, productList]);

    const handlePreview = (src) => {
        // 获取图片信息。网络图片需先配置download域名才能生效。
        Taro.previewImage({
            current: src,
            urls: detail?.img_list as Array<string>,
        });
    };

    return (
        <View className={s.Detail}>
            <View className={s.title}>{detail?.name}</View>
            <View className={s.content}>{detail?.description}</View>
            {detail?.img_list[0] &&
                (detail.img_list as Array<string>).map((v) => {
                    return (
                        <Image
                            className={s.image}
                            src={v}
                            onClick={() => handlePreview(v)}
                            mode="widthFix"
                        />
                    );
                })}
        </View>
    );
}
