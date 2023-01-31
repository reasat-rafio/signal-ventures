import { RiArticleLine } from 'react-icons/ri'

export default {
    name: 'articles',
    title: 'Articles ',
    type: 'document',
    icon: RiArticleLine,
    i18n: true,
    fields: [
        {
            name: 'placeholderMessage',
            title: 'Placeholder Message',
            type: 'text',
        },
        {
            name: 'placeholderImage',
            title: 'Placeholder Image',
            type: 'image',
        },
        {
            name: 'authorIcon',
            title: 'Author Icon',
            type: 'image',
        },
        {
            name: 'publisedAtIcon',
            title: 'Published At Icon',
            type: 'image',
        },
    ],
    preview: {
        select: {
            title: 'placeholderMessage',
            media: 'placeholderImage',
        },
    },
}
