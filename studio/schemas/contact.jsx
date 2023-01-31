import { AiFillContacts } from 'react-icons/ai'

export default {
    name: 'contact',
    title: 'Contact',
    type: 'document',
    icon: AiFillContacts,
    i18n: true,
    fields: [
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'subject',
            title: 'Subject',
            type: 'string',
        },

        {
            name: 'message',
            title: 'Message',
            type: 'string',
        },

        {
            name: 'ctaButton',
            title: 'CTA Button',
            type: 'ctaButton',
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
    ],
    preview: {
        select: {
            title: 'email',
            subtitle: 'message',
            media: 'logo',
        },
    },
}
