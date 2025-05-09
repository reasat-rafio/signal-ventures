import { MdLink } from 'react-icons/md'

export default {
    name: 'navItems',
    title: 'Nav Items',
    type: 'object',
    icon: MdLink,
    i18n: true,
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
        { name: 'dark_mode', title: 'Dark Mode', type: 'boolean' },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
        { name: 'key', title: 'Key', type: 'string' },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'href',
            media: 'logo',
        },
    },
}
