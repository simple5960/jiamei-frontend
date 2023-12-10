import Taro from '@tarojs/taro';

export function getEleRect(selector) {
    return new Promise((resolve, reject) => {
        const query = Taro.createSelectorQuery();
        query.select(selector).boundingClientRect();
        query.exec((res) => {
            if (res && res[0]) {
                const width = res[0].width;
                const height = res[0].height;
                resolve({ width, height });
            }
        });
    });
}
