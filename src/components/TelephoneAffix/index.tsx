import React from 'react';

import s from './index.module.less';
import { Image, View } from '@tarojs/components';

import telephoneSvg from '~/assets/icon/telephone.svg'
import Taro from '@tarojs/taro';
import { handleCopy } from '~/utils/copy';

export default function TelephoneAffix() {
    const handleClick = () => {
      Taro.showModal({
          title: '联系方式',
          content: '点击确定复制联系方式',
          confirmText: '确定',
          success: function (res) {
            if (res.confirm) {
              handleCopy('15892310251')
            }
          }
      });
    }
    return (
        <View className={s.TelephoneAffix}>
            <Image className={s.image} src={telephoneSvg} />
            <View className={s.contact} onClick={handleClick}>
                联系我们
            </View>
        </View>
    );
}
