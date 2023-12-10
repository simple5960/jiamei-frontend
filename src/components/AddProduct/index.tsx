import { Button, Image, Label, Textarea, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AtForm, AtInput } from 'taro-ui';

import { addProduct } from '~/reducer/product';
import { AppDispatch } from '~/store';

import Category from '../Category';
import Location from '../Location';
import closeIcon from '~/assets/icon/close.svg';
import s from './index.module.less';
import { req } from '~/utils/request';
import { uploadImage } from '~/utils/upload';

export default function AddProduct() {
    const dispatch = useDispatch<AppDispatch>();
    const initState = {
        name: '',
        description: '',
        location_id: 1,
        category_id: 1,
        img_list: [],
    };
    const [productState, setProductState] = useState<any>(initState);

    const setLocation = (id) =>
        setProductState({ ...productState, location_id: id });

    const setCategory = (id) =>
        setProductState({ ...productState, category_id: id });

    const handleChange = (value, key) => {
        const newObj = { ...productState };
        newObj[key] = value;
        setProductState({ ...newObj });
    };

    const addImage = async () => {
        const res = await Taro.chooseImage({
            count: 1, // 可选择图片的数量，这里设置为1
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        });

        const tempFilePath = res.tempFilePaths[0];

        const url = await uploadImage(tempFilePath);
        const newImageList = [...productState.img_list, url];
        setProductState({ ...productState, img_list: newImageList });
    };

    const deleteImage = (url) => {
        const newImageList = productState.img_list.filter(
            (item) => item !== url
        );
        setProductState({ ...productState, img_list: newImageList });
        const pathname = new URL(url).pathname;
        req('/deleteImage', { filePath: pathname });
    };

    const submit = () => {
        const { name, description } = productState;
        if (!name || !description) {
            Taro.showToast({
                title: '请输入名称或者描述后再提交!',
                icon: 'error',
            });
            return;
        }
        dispatch(addProduct(productState)).then(() => {
            setProductState(initState);
            Taro.showToast({ title: '提交成功', icon: 'success' });
            Taro.navigateTo({ url: '/pages/index/index'})
            // Taro.switchTab({ url: '/pages/index/index' });
        });
    };

    return (
        <AtForm className={s.AddProduct}>
            <Label>产品名称</Label>
            <Textarea
                name="name"
                placeholder="请输入产品名称"
                value={productState.name}
                onInput={(e) => {
                    const value = e.detail.value;
                    handleChange(value, 'name');
                }}></Textarea>
            <Label>描述</Label>
            <Textarea
                name="description"
                placeholder="请输入产品描述"
                value={productState.description}
                onInput={(e) => {
                    const value = e.detail.value;
                    handleChange(value, 'description');
                }}></Textarea>
            {/* <AtInput
                name="name"
                title="名称"
                type="text"
                placeholder="请输入产品名称"
                value={productState.name}
                onChange={(value) => handleChange(value, 'name')}
            /> */}
            {/* <AtInput
                name="description"
                title="描述"
                type="text"
                placeholder="请输入产品描述"
                value={productState.description}
                onChange={(value) => handleChange(value, 'description')}
            /> */}
            <View className={s.imageWrapper}>
                {productState.img_list.map((v) => {
                    if (v) {
                        return (
                            <View className={s.imageItem}>
                                <Image
                                    className={s.closeIcon}
                                    src={closeIcon}
                                    onClick={() => deleteImage(v)}
                                />
                                <Image className={s.image} src={v} />
                            </View>
                        );
                    }
                    return <></>;
                })}
            </View>
            <Button onClick={addImage}>添加图片</Button>
            <Location
                setLocation={setLocation}
                location_id={productState.location_id}
            />
            <Category
                setCategory={setCategory}
                category_id={productState.category_id}
            />
            <Button onClick={submit}>提交</Button>
        </AtForm>
    );
}
