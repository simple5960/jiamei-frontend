import {Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, {CSSProperties, useEffect, useState} from 'react'

import s from './index.module.less'
import { isH5 } from '~/constant'

type IProps = {
  className?: string
  src: string
  compKey: string | number
  style?: CSSProperties
  onClick?: any
  intersectionCompId?: any
}

let observer

export default function LazyImage({
  className,
  src,
  compKey,
  style,
  onClick,
  intersectionCompId,
}: IProps) {
  const [visible, setVisible] = useState(false)
  const idSelector = `image-${compKey}`

  const handleObserverMp = () => {
      const page = Taro.getCurrentInstance().page || this;
      observer = Taro.createIntersectionObserver(page);

      observer
          .relativeTo(`#${intersectionCompId}`, (res) => {
              // 页面有多重滚动情况
              if (res.intersectionRatio > 0) {
                  setVisible(true);
              } else {
                  setVisible(false);
              }
          })
          .relativeToViewport()
          .observe(`#${idSelector}`, (res) => {
              if (res.intersectionRatio > 0) {
                  setVisible(true);
              } else {
                  setVisible(false);
              }
          });
  };

  const handleObserverH5 = () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };
    const dom = document.querySelector(`#${idSelector}`)

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setVisible(true);
            }
        });
    }, options);

    if (dom) observer.observe(dom);
  }

  useEffect(() => {
    setTimeout(() => {
      if (isH5) {
        handleObserverH5()
      } else {
        handleObserverMp()
      }
    }, 300)

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [])

  return (
      <Image
          id={idSelector}
          onClick={onClick}
          key={compKey}
          src={visible ? src : ''}
          className={`${s.image} ${className}`}
          style={style}
          mode="aspectFill"
      />
  );
}
