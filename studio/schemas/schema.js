// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
//

//site
import logos from './site/logos'
import navs from './site/nav'
import startButton from './site/startButton'
import languageSwitcher from './site/languageSwitcher'

//landing page
import landingPage from './landingPage'
import seo from './seo'

//portfolio
import portfolioItem from './portfolioItem'

//contact
import contact from './contact'

//types = object
import ctaButton from './ctaButton'
import navItems from './navItems'

//
import modal from './modal'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: 'default',
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([
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
    ]),
})
