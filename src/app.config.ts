export default defineAppConfig({
    pages: [
        'pages/index/index',
        'pages/add/index',
        'pages/detail/index',
        'pages/admin/index',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
    },
    // h5 不要用 tabbaer 会报错
    // tabBar: {
    //     backgroundColor: '#fff',
    //     selectedColor: '#000',
    //     color: '#999999',
    //     borderStyle: 'black',
    //     list: [
    //         {
    //             pagePath: 'pages/index/index',
    //             text: '首页',
    //             iconPath: 'assets/bottom-bar/selected-index.png',
    //             selectedIconPath: 'assets/bottom-bar/selected-index.png',
    //         },
    //         {
    //             pagePath: 'pages/add/index',
    //             text: '我的',
    //             iconPath: 'assets/bottom-bar/selected-profile.png',
    //             selectedIconPath: 'assets/bottom-bar/selected-profile.png',
    //         },
    //     ],
    // },
});
