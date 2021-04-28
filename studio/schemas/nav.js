export default {
    name: 'nav',
    title: 'Navigation',
    type: 'document',
    i18n: true,
    fields: [
        {
            name: 'menu',
            title: 'Nav',
            type: 'array',
            of: [{ type: 'menuItem' }],
        },
    ],
}
