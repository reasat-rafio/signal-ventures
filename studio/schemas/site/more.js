import { MdMoreHoriz } from 'react-icons/md'

export default {
    name: 'more',
    title: 'More',
    type: 'document',
    icon: MdMoreHoriz,
    i18n: true,
    fields: [
        // {
        //     name: 'singlePortfolioWindowButton',
        //     title: '',
        //     type: 'string',
        // },
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
}
