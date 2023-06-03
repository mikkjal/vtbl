import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'VTable',
	description: 'A Vue 3 Component',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: 'Get Started', link: '/installation' }],

		sidebar: [
			{
				text: 'Introduction',
				collapsed: true,
				items: [
					{ text: 'Installation', link: '/installation' },
					{ text: 'Getting Started', link: '/getting-started' },
				],
			},
			{
				text: 'Component',
				collapsed: true,
				items: [
					{ text: 'Props', link: '/component/props' },
					{ text: 'Emits', link: '/component/emits' },
					{ text: 'Slots', link: '/component/slots' },
					{ text: 'Everything, All at Once', link: '/component/full' },
					{ text: 'Reference', link: '/component/reference' },
				],
			},
			{
				text: 'Additional',
				collapsed: true,
				items: [
					{
						text: 'Styling',
						items: [
							{ text: 'Default Styles', link: '/styling/default' },
							{ text: 'Custom Styles', link: '/styling/custom' },
						],
					},
				],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
	},
});
