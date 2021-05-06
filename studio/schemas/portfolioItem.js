import { GiBookshelf } from 'react-icons/gi'

export default {
    name: 'portfolio',
    title: 'Portfolio',
    type: 'document',
    icon: GiBookshelf,
    i18n: true,
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            hidden: true,
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'href',
            media: 'logo',
        },
    },
}
