import { groq } from 'next-sanity'
import { withDimensions } from 'sanity-react-extra'

export const siteQuery = groq`{
    "logos": *[_type == "site.logos" && !(_id in path('drafts.**'))] [0] {
        "dark_logo": ${withDimensions('darkLogo')},
        "light_logo": ${withDimensions('lightLogo')},
        "favicon": ${withDimensions('favicon')},
      },
    "nav": *[_type == "site.nav" && __i18n_lang == $locale && !(_id in path('drafts.**'))] [0] {
        menu[] {
           ...,
           "logo": ${withDimensions('logo')},
        }
    },
    "startButton":  *[_type == "site.startButton" && __i18n_lang == $locale && !(_id in path('drafts.**'))] [0] {
        ...,
        "logo": ${withDimensions('logo')}
    },
    "languageSwitcher" :  *[_type == "site.languageSwitcher" && __i18n_lang == $locale && !(_id in path('drafts.**'))] {
        ...,
        "logo": ${withDimensions('logo')}
    },
}
`

export const query = groq`{
    "site": ${siteQuery},
    "landingPage": *[_type == "landingPage" && __i18n_lang == $locale && !(_id in path('drafts.**'))][0],
    "contact": *[_type == "contact" &&  __i18n_lang == $locale && !(_id in path('drafts.**'))] {
      ...,
      "logo": ${withDimensions('logo')}
    },
    "portfolio": *[_type == "portfolio"  && !(_id in path('drafts.**'))]  | order(order asc) {
        ...,
        "logo": ${withDimensions('logo')}
    },
    "articles": *[_type == "articles"  && __i18n_lang == $locale && !(_id in path('drafts.**'))][0] {
        placeholderMessage,
        "placeholderImage": ${withDimensions('placeholderImage')},
        "authorIcon": ${withDimensions('authorIcon')},
        "publisedAtIcon": ${withDimensions('publisedAtIcon')},
    },
    "modal": *[_type == "modal"  && __i18n_lang == $locale && !(_id in path('drafts.**'))] {
        ...,
        "successImg": ${withDimensions('successImg')},
        "errorImg": ${withDimensions('errorImg')},
    },
    "seo": *[_type == "seo" &&  __i18n_lang == $locale && !(_id in path('drafts.**'))] [0],
    "more": *[_type == "more" &&  __i18n_lang == $locale && !(_id in path('drafts.**'))] [0],

  }`
