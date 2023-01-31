// First, we must import the schema creator

// Then import schema types from any plugins that might expose them
//

//site
import logos from './site/logos'
import navs from './site/nav'
import startButton from './site/startButton'
import languageSwitcher from './site/languageSwitcher'
import more from './site/more'

//landing page
import landingPage from './landingPage'
import seo from './seo'

//portfolio
import portfolioItem from './portfolioItem'

//contact window
import contact from './contact'

// articles window
import articles from './articles'

//types = object
import ctaButton from './ctaButton'
import navItems from './navItems'

//
import modal from './modal'

export const schemaTypes = [
    logos,
    navs,
    startButton,
    seo,
    landingPage,
    navItems,
    ctaButton,
    portfolioItem,
    contact,
    languageSwitcher,
    modal,
    articles,
    more,
]
