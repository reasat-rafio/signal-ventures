import { BiWindowOpen } from 'react-icons/bi'

export default {
    name: 'modal',
    title: 'Modal',
    type: 'document',
    icon: BiWindowOpen,
    i18n: true,
    fields: [
        {
            name: 'successMessage',
            title: 'Success Message',
            type: 'string',
        },
        {
            name: 'successImg',
            title: 'Success Img',
            type: 'image',
        },
        {
            name: 'errorMessage',
            title: 'Error Message',
            type: 'string',
        },
        {
            name: 'errorImg',
            title: 'Error Img',
            type: 'image',
        },
        {
            name: 'closeButton',
            title: 'Button',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'successMessage',
            media: 'successImg',
        },
    },
}
