export default {
    name: 'site',
    title: 'Site',
    type: 'document',
    fields: [
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
        {
            name: 'startButton',
            title: 'Start Button',
            type: 'startButton',
        },
        {
            name: 'menu',
            title: 'Menu',
            type: 'array',
            of: [{ type: 'menuItem' }],
        },
    ],
    preview: {
        select: {
            media: 'logo',
        },
    },
}
