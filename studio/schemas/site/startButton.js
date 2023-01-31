import { AiOutlineMenu } from 'react-icons/ai'
export default {
    name: 'site.startButton',
    title: 'Start Button',
    type: 'document',
    i18n: true,
    icon: AiOutlineMenu,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'logo',
        },
    },
}
