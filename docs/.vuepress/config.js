module.exports = {
    base: '/',
	title: 'Grow',
	description: 'Vuepress blog',
	themeConfig: {
		// repo: 'https://github.com/xxxxxxx/blog-demo',
		// 自定义仓库链接文字。
		// repoLabel: 'My GitHub',
		// 右上角Nav
        nav: [
            {
                text: 'Learn',
                link: '/blog/Learn'
		    },
            {
                text: 'Work',
                link: '/blog/Work'
            }
        ],
        sidebarDepth: 2,
        logo: '/image/logo.jpg'
	},
	// 插件
	plugins: ['vuepress-plugin-smooth-scroll','autobar'], // 让侧边栏显示跳转文章锚点
	// ico图标
	head: [
		['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favorite.ico` }]
    ],
}