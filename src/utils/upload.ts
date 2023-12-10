import Taro from "@tarojs/taro";

export const fixImg = (id) => {
    let url = '';
    if (!id) {
        return url;
    }
    url = `https://al-img.yootang.com/img/view/id/${id}`;
    return url;
};

const SERVER_URL = 'https://opapi.yootang.com/api/file/img/upload'; // 统一用线上的, 不然测试环境要连 VPN

export function uploadImage(filePath) {
    return new Promise((resolve, reject) => {
        Taro.uploadFile({
            url: SERVER_URL, // 服务器地址
            filePath: filePath, // 要上传的文件路径
            name: 'img', // 接收文件的字段
            success: (res) => {
                console.log('uploadSuccess', Date.now());
                const data = JSON.parse(res.data) || {};
                const img = (data.data || {}).img;
                const id = img._id;
                resolve(fixImg(id));
            },
            fail: (err) => {
                console.log('uploadFail', Date.now());
                reject(err);
            },
        });
    });
}
