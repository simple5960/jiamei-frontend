import { Button, Input, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AdminLogin } from '~/reducer/account';
import { AppDispatch } from '~/store';


export default function Admin() {
  const [state, setState] = useState({username: '', password: ''})
  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (value, key) => {
      const newObj = { ...state };
      newObj[key] = value;
      setState({ ...newObj });
  };

  const handleLogin = () => {
    dispatch(AdminLogin({...state})).then(res => {
      if (res.payload.success === 'success') {
        Taro.navigateTo({url: '/pages/add/index'})
      }
    })
  }

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
