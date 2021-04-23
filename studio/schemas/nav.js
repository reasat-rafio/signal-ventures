export default {
    name: 'nav',
    title: 'Navigation',
    type: 'document',
    fields: [
        {
            name: 'menu',
            title: 'Nav',
            type: 'array',
            of: [{ type: 'menuItem' }],
        },
    ],
}
