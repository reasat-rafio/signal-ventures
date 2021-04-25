import { groq } from 'next-sanity'
import { withDimensions } from 'sanity-react-extra'

export const siteQuery = groq`{
    "sites": *[_id == "site"][0] {
        "dark_logo": ${withDimensions('darkLogo')},
        "light_logo": ${withDimensions('lightLogo')},
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
    "landingPage": *[_id == "landingPage"][0]{
      seo,
      heading,
      description,
      ctaButton,
    },
    "contact": *[_type == "contact"] {
      ...,
      "logo": ${withDimensions('logo')}
    },
    "portfolio": *[_type == "portfolioItem"] {
        ...,
        "logo": ${withDimensions('logo')}
    }
  }`
