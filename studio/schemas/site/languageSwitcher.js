import { FaLanguage } from 'react-icons/fa'

export default {
    name: 'site.languageSwitcher',
    title: 'Language Switcher',
    type: 'document',
    i18n: true,
    icon: FaLanguage,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'locales',
            title: 'Locales',
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
