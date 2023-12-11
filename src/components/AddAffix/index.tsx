import React from "react";

import s from './index.module.less'
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function AddAffix() {
  return <View className={s.AddAffix} onClick={() => Taro.navigateTo({url: '/pages/add/index'})}>
    添加产品
  </View>
}