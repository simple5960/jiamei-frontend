import { Image, Swiper, SwiperItem, View } from "@tarojs/components"
import React from "react"

import s from './index.module.less'

export default function Desc() {
  const imageList = [
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1fffdaf8-d041-4d4e-b6c9-158bf8df9be9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1704783765&t=d6d89f855d468f61fc7f0019eb5fbd7a',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F4463c11c-4928-41bf-b6a0-2648960915b5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1704783840&t=f0d472d67ca987e91b6a76e46e3f022c',
  ];
  return (
      <View className={s.desc}>
          <View className={s.name}>佳美装饰</View>
          <View className={s.slogan}>专耕门窗装饰领域二十余年</View>
          <View className={s.do}>
              专业从事塑钢门窗、铝合金门窗、不锈钢、彩钢房、阳光房、钢结构、设计、制作、安装
          </View>
          <Swiper indicatorDots autoplay>
              {imageList.map((v) => {
                  return (
                      <SwiperItem key={v}>
                          <Image
                              className={s.image}
                              src={v}
                              mode="aspectFill"
                          />
                      </SwiperItem>
                  );
              })}
          </Swiper>
      </View>
  );
}