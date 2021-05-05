import { IoNavigate } from 'react-icons/io5'

export default {
    name: 'site.nav',
    title: 'Navigation',
    type: 'document',
    icon: IoNavigate,
    i18n: true,
    fields: [
        {
            name: 'menu',
            title: 'Nav',
            type: 'array',
            of: [{ type: 'navItems' }],
        },
    ],
    preview: {
        select: {
            media: 'IoNavigate',
        },
        prepare(selection) {
            return {
                title: 'Navs',
            }
        },
    },
}
