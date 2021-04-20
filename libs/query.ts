import { groq } from 'next-sanity'
import { withDimensions } from 'sanity-react-extra'

export const siteQuery = groq`{
    "sites": *[_id == "site"][0] {
        "logo": ${withDimensions('logo')},
        "nav": menu[0..3] {
            title,
            _key,
            logo{
                asset {
                _ref
                },
            },
         },
    }
}`
