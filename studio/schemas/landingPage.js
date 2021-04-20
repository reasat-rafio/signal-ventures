export default {
    name: 'landingPage',
    title: 'Landing Page',
    type: 'document',
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
    ],
    preview: {
        select: {
            title: 'heading',
            subtitle: 'description',
        },
    },
}
