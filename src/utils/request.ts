import Taro from '@tarojs/taro';

const ENV_HOST = {
    development: 'http://192.168.40.166:7001',
    preview: 'http://192.168.40.166:7001',
    production: 'http://192.168.40.166:7001',
};

const API_HOST = ENV_HOST.development;

export async function req(url: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
        Taro.request({
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            url: `/request${url}`,
            data: params,
            success: (res) => {
                console.log(`${url} success`, res.data);
                resolve(res?.data);
            },
            fail: reject,
        });
    });
}
