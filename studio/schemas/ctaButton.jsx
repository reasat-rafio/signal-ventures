import React from 'react'
import { Button } from 'react95'

export default {
    name: 'ctaButton',
    title: 'CTA Button',
    type: 'object',
    i18n: true,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'href',
            title: 'href',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        component: ({ value }) => <Button style={{ padding: '5px 30px' }}>{value.title}</Button>,
    },
}
