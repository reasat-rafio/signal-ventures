export default {
    name: 'site',
    title: 'Site',
    type: 'document',
    fields: [
        {
            name: 'lightLogo',
            title: 'Light Logo',
            type: 'image',
        },
        {
            name: 'darkLogo',
            title: 'Dark Logo',
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
            media: 'lightLogo',
            media: 'darkLogo',
        },
    },
}
