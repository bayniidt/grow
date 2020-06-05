module.exports = {
	base: '/vue_press/',
	title: 'Grow',
	description: 'Vuepress blog',
	themeConfig: {
		// repo: 'https://github.com/xxxxxxx/blog-demo',
		// 自定义仓库链接文字。
		// repoLabel: 'My GitHub',
		// 右上角Nav
		nav: [{
			text: 'Learn',
			link: '/blog/Learn'
		},
		{
			text: 'History',
			link: '/blog/History'
		},
		{
			text: 'Work',
			link: '/blog/Work'
		}
		],
		
		
	},
	// 插件
	plugins: ['vuepress-plugin-smooth-scroll','autobar'], // 让侧边栏显示跳转文章锚点
	// ico图标
	head: [
		['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favorite.ico` }]
	 ],

}