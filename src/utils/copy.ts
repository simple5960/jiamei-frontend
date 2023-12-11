import Taro from '@tarojs/taro';

const handleCopy = (
    text: string | number,
    successText = '复制成功',
    failText = '复制失败'
) => {
    if (!text) return;
    const icon = successText.length > 7 ? 'none' : 'success';
    Taro.setClipboardData({
        data: `${text}`,
        success: () => Taro.showToast({ title: successText, icon }),
        fail: () => Taro.showToast({ title: failText, icon: 'error' }),
    });
};
export { handleCopy };
