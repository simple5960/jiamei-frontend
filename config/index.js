import path from 'path';

const pluginOptions = {
    less: {
        patterns: [path.resolve(__dirname, '..', 'src/app.less')],
    },
};

const host = process.env.NODE_ENV === 'production' ? '8.137.21.138' : 'localhost';

const config = {
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
            exclude: ['taro-ui'],
        },
    },
    cache: {
        enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
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
                '/api': {
                    target: `http://${host}:7001`,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '', // 如果接口地址有前缀，可以在这里修改
                    },
                },
            },
        },
        framework: 'react',
        useHtmlComponents: true,
        publicPath: '/',
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
