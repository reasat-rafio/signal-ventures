import { groq } from 'next-sanity'
import { withDimensions } from 'sanity-react-extra'

export const siteQuery = groq`{
    "sites": *[_id == "site"][0] {
        "logo": ${withDimensions('logo')},
        "startButton": startButton {
        ...,
        "logo": ${withDimensions('logo')}
        },
        "nav": menu[] {
            ...,
            "logo": ${withDimensions('logo')}
        
      }
    }
}`
