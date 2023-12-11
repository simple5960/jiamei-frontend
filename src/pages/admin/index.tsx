import { Button, Input, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLogin } from '~/reducer/account';
import { AppDispatch, RootState } from '~/store';


export default function Admin() {
  const [state, setState] = useState({username: '', password: ''})
  const {isLogin} = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (value, key) => {
      const newObj = { ...state };
      newObj[key] = value;
      setState({ ...newObj });
  };

  const handleLogin = () => {
    dispatch(AdminLogin({...state})).then(res => {
      if (res.payload.success === 'success') {
        Taro.navigateTo({url: '/pages/index/index'})
      } else {
        Taro.showToast({title: '用户名或密码错误！'})
      }
    })
  }

  useEffect(() => {
    if (isLogin) {
      Taro.navigateTo({url: '/pages/index/index'})
    }
  }, [isLogin])

    return (
        <View className="index">
            <Input
                placeholder="请输入用户名"
                value={state.username}
                onInput={(e) => handleChange(e.detail.value, 'username')}
            />
            <Input
                placeholder="请输入密码"
                value={state.password}
                onInput={(e) => handleChange(e.detail.value, 'password')}
            />
            <Button onClick={handleLogin}>登录</Button>
        </View>
    );
}
