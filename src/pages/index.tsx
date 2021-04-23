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
import { useEffect, useRef } from 'react'
import { useSiteHeightAndWidth, useToText } from '../../libs/hooks'
import { Container } from '../styles/Styles'
import Parser from 'rss-parser'
import axios from 'axios'
const query = groq`{
  "site": ${siteQuery},
  "landingPage": *[_id == "landingPage"][0]{
    seo,
    heading,
    description,
    ctaButton
  }
}`
// let parser = new Parser()
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MEDIUM_URL}`)

    return {
        props: {
            blog: data,
            sanityData: await sanityStaticProps({ query, context }),
        },
    }
}

export default function Index({ blog, sanityData }) {
    const {
        data: { site, landingPage },
    } = useSanityQuery(query, sanityData)

    const {
        state: { activeWindows, darkMode },
    } = useCtx()

    const siteRef = useRef<HTMLDivElement>(null)
    const { height, width } = useSiteHeightAndWidth(siteRef)

    const { blogInfo } = useToText(blog.items, blog.feed)

    return (
        <Container ref={siteRef} darkMode={darkMode}>
            <NextSeo title={landingPage.seo.title} description={landingPage.seo.description} />
            <div className="container mx-auto flex flex-col items-center ">
                <Home
                    title={landingPage.heading}
                    description={landingPage.description}
                    logo={site.sites.logo}
                    button={landingPage.ctaButton}
                />

                {activeWindows.map(({ index }: WindowsProps) => (
                    <Window_ key={index} index={index} width={width} blogInfo={blogInfo} />
                ))}
                <Navbar navs={site.sites.nav} />
            </div>
        </Container>
    )
}
