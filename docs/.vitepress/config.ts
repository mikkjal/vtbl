import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'VTable',
    description: 'A Vue 3 Component',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '1.0.10', items: [{ text: 'Changelog', link: 'https://github.com/mikkjal/vtbl/blob/main/CHANGELOG.md' }] },
            { text: 'Get Started', link: '/installation' },
        ],
        logo: '/logo.png',
        sidebar: [
            {
                text: 'Introduction',
                collapsed: true,
                items: [
                    { text: 'Installation', link: '/installation' },
                    { text: 'Getting Started', link: '/getting-started' },
                    { text: 'Demo', link: '/demo' },
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
        socialLinks: [{ icon: 'github', link: 'https://github.com/mikkjal/vtbl' }],
    },
});
