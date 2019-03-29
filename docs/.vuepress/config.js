module.exports = {
    title: "我的博客",
    description: "我的学习与工作总结",
    head: [
        ['link', { rel: 'icon', href: '/images/avatar.png' }]
    ],
    "themeConfig": {
        nav: [
            { text: '主页', link: '/' },
            {
                text: '文章列表',
                items: [
                    { text: '随笔', link: '/articles/essays/' },
                    { text: 'Qt', link: '/articles/qt/' }
                ]
            },
            { text: 'github', link: 'https://github.com/junjiangao' }
        ]
    }
}