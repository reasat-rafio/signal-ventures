import { GiChart } from 'react-icons/gi'

export default {
    name: 'seo',
    title: 'Seo',
    type: 'document',
    icon: GiChart,
    i18n: true,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
}
