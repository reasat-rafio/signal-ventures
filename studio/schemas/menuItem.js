import { MdLink } from 'react-icons/md'

export default {
    name: 'menuItem',
    title: 'Menu Item',
    type: 'object',
    icon: MdLink,
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
        { name: 'dark_mode', title: 'Dark Mode', type: 'number' },
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
