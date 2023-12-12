import path from 'path';
// scp -r dist root@8.137.21.138:/usr/local/jiamei/jiamei-nginx
const pluginOptions = {
    less: {
        patterns: [path.resolve(__dirname, '..', 'src/app.less')],
    },
};
// 现在用的是本地打包，妥协一下
const host = process.env.NODE_ENV !== 'production' ? '8.137.21.138' : '127.0.0.1';
const config = {
    devServer: {
        proxy: {
            '/request': {
                target: `http://${host}:7001`,
                changeOrigin: true,
                pathRewrite: {
                    '^/request': '', // 如果接口地址有前缀，可以在这里修改
                },
            },
            '/api': {
                target: `https://opapi.yootang.com`,
                changeOrigin: true,
            },
        },
    },
    projectName: 'jiamei-decoration',
    date: '2023-7-17',
    designWidth: 750,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
        '@tarojs/plugin-html',
        ['taro-plugin-style-resource', pluginOptions],
    ],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {},
    },
    framework: 'react',
    compiler: {
        type: 'webpack5',
        prebundle: {
            enable: false,
            exclude: ['taro-ui'],
        },
    },
    cache: {
        enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
        postcss: {
            pxtransform: {
                enable: true,
                config: {},
            },
            url: {
                enable: true,
                config: {
                    limit: 1024, // 设定转换尺寸上限
                },
            },
            cssModules: {
                enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
    },
    h5: {
        devServer: {
            proxy: {
                '/request': {
                    target: `http://${host}:7001`,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/request': '', // 如果接口地址有前缀，可以在这里修改
                    },
                },
                '/api': {
                    target: `https://opapi.yootang.com`,
                    changeOrigin: true,
                },
            },
        },
        framework: 'react',
        useHtmlComponents: true,
        // 开发的时候设置为 / 打包的时候设置为 ./
        publicPath: (process.env.npm_config_argv || '').includes('dev')
            ? '/'
            : './',
        staticDirectory: 'static',
        postcss: {
            autoprefixer: {
                enable: true,
                config: {},
            },
            cssModules: {
                enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
    },
    rn: {
        appName: 'taroDemo',
        postcss: {
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
            },
        },
    },
    alias: {
        '~/components': path.resolve(__dirname, '..', 'src/components'),
        '~/static': path.resolve(__dirname, '..', 'src/static'),
        '~/utils': path.resolve(__dirname, '..', 'src/utils'),
        '~/action': path.resolve(__dirname, '..', 'src/action'),
        '~/store': path.resolve(__dirname, '..', 'src/store'),
        '~/reducer': path.resolve(__dirname, '..', 'src/reducer'),
        '~/assets': path.resolve(__dirname, '..', 'src/assets'),
        '~/config': path.resolve(__dirname, '..', 'src/config'),
        '~/hooks': path.resolve(__dirname, '..', 'src/hooks'),
        '~': path.resolve(__dirname, '..', 'src'),
    },
};

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'));
    }
    return merge({}, config, require('./prod'));
};
