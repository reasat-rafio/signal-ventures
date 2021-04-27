export default {
    name: 'site',
    title: 'Site',
    type: 'document',
    fields: [
        {
            name: 'lightLogo',
            title: 'Light Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'darkLogo',
            title: 'Dark Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'favicon',
            title: 'Favicon',
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
