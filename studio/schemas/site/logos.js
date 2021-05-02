import { FaRegStar } from 'react-icons/fa'

export default {
    name: 'site.logos',
    title: 'Logos',
    type: 'document',
    icon: FaRegStar,
    fields: [
        {
            name: 'lightLogo',
            title: 'Light Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'darkLogo',
            title: 'Dark Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
        },
    ],
    preview: {
        select: {
            media: 'lightLogo',
        },
    },
}
