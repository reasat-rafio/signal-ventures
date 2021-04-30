import { VscPreview } from 'react-icons/vsc'

export default {
    name: 'landingPage',
    title: 'Landing Page',
    type: 'document',
    icon: VscPreview,
    i18n: true,
    fields: [
        {
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'ctaButton',
            title: 'CTA Button',
            type: 'ctaButton',
        },
    ],
    preview: {
        select: {
            title: 'heading',
            subtitle: 'description',
        },
    },
}
