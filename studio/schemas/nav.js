import { IoNavigate } from 'react-icons/io5'

export default {
    name: 'nav',
    title: 'Navigation',
    type: 'document',
    icon: IoNavigate,
    fields: [
        {
            name: 'menu',
            title: 'Nav',
            type: 'array',
            of: [{ type: 'menuItem' }],
        },
    ],
}
