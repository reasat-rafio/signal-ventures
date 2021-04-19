import { MdLink } from 'react-icons/md'

export default {
    name: 'menuItem',
    title: 'Menu Item',
    type: 'object',
    icon: MdLink,
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'href',
        },
    },
}
