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

function compressImage(file, maxWidth = 800, maxHeight = 600, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    resolve(blob);
                },
                file.type || 'image/jpeg',
                quality || 0.8
            );
        };
        img.onerror = function (error) {
            reject(error);
        };
        img.src = URL.createObjectURL(file);
    });
}
export async function uploadImage(filePath) {
    try {
        const res = await fetch(filePath);
        const blob = await res.blob();
        const compressedImageBlob = await compressImage(blob);

        const formData = new FormData();
        formData.append('img', compressedImageBlob, 'compressed_image.jpg');

        const uploadRes = await fetch('/api/file/img/upload', {
            method: 'POST',
            body: formData,
        });

        if (uploadRes.ok) {
            const data = await uploadRes.json();
            const img = (data.data || {}).img;
            const id = img ? img._id : null;
            return fixImg(id);
        } else {
            throw new Error('Failed to upload image');
        }
    } catch (error) {
        console.error('Error uploading compressed image:', error);
        throw error;
    }
}
// export function uploadImage(filePath) {
//     return new Promise(async (resolve, reject) => {
//         Taro.uploadFile({
//             url: '/api/file/img/upload', // 服务器地址
//             filePath: filePath, // 要上传的文件路径
//             name: 'img', // 接收文件的字段
//             success: (res) => {
//                 console.log('uploadSuccess', Date.now());
//                 const data = JSON.parse(res.data) || {};
//                 const img = (data.data || {}).img;
//                 const id = img._id;
//                 resolve(fixImg(id));
//             },
//             fail: (err) => {
//                 console.log('uploadFail', Date.now());
//                 reject(err);
//             },
//         });
//     });
// }
