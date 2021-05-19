import { GiBookshelf } from 'react-icons/gi'

export default {
    name: 'portfolio',
    title: 'Portfolio',
    type: 'document',
    icon: GiBookshelf,

    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
        { name: 'projectTitle', title: 'Project Title', type: 'string' },
        {
            name: 'projectDescription',
            title: 'Project Description',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            hidden: true,
        },
        {
            name: 'ctaButton',
            title: 'CTA Button',
            type: 'ctaButton',
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
