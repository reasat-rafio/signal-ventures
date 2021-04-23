export default {
    name: 'startButton',
    title: 'Start Button',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
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
