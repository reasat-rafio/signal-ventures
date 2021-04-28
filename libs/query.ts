import { groq } from 'next-sanity'
import { withDimensions } from 'sanity-react-extra'

export const siteQuery = groq`{
    "sites": *[_type == "site" &&  __i18n_lang == $locale][0] {
        "dark_logo": ${withDimensions('darkLogo')},
        "light_logo": ${withDimensions('lightLogo')},
        "favicon": ${withDimensions('favicon')},
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

export const query = groq`{
    "site": ${siteQuery},
    "landingPage": *[_type == "landingPage" &&  __i18n_lang == $locale][0],
    "contact": *[_type == "contact"] {
      ...,
      "logo": ${withDimensions('logo')}
    },
    "portfolio": *[_type == "portfolio"] {
        ...,
        "logo": ${withDimensions('logo')}
    }
  }`
