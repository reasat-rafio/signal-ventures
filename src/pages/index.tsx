import { groq } from 'next-sanity'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { SanityProps } from 'next-sanity-extra'
import { Window_ } from '../components/window/Window'
import { Home } from '../components/landing/Home'
import { Navbar } from '../components/navbar/Navbar'
import { useCtx } from '../../store'
import { siteQuery } from '../../libs/query'
import { sanityStaticProps, useSanityQuery } from '../../utils/sanity'
import { useRef } from 'react'
import { useSiteHeightAndWidth } from '../../libs/hooks'
import { Container } from '../styles/Styles'

const query = groq`{
  "site": ${siteQuery},
  "landingPage": *[_id == "landingPage"][0]{
    seo,
    heading,
    description,
    ctaButton
  }
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
    props: await sanityStaticProps({ query, context }),
})

export default function Index(props: SanityProps) {
    const {
        data: { site, landingPage },
    } = useSanityQuery(query, props)

    const {
        state: { activeWindows, darkMode },
    } = useCtx()
    console.log('darkMode:', darkMode)

    const siteRef = useRef<HTMLDivElement>(null)
    const { height, width } = useSiteHeightAndWidth(siteRef)

    return (
        <Container ref={siteRef} darkMode={darkMode}>
            <NextSeo title={landingPage.seo.title} description={landingPage.seo.description} />
            <div className="container mx-auto flex flex-col items-center ">
                <Home
                    title={landingPage.heading}
                    description={landingPage.description}
                    logo={site.sites.logo.asset.url}
                    button={landingPage.ctaButton}
                />

                {activeWindows.map(({ index }: WindowsProps) => (
                    <Window_ key={index} index={index} width={width} />
                ))}
                <Navbar navs={site.sites.nav} />
            </div>
        </Container>
    )
}
