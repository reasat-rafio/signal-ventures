import { groq } from 'next-sanity'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { Window_ } from '../components/window/Window'
import { Home } from '../components/landing/Home'
import { Navbar } from '../components/navbar/Navbar'
import { useCtx } from '../../store'
import { query } from '../../libs/query'
import { sanityStaticProps, useSanityQuery } from '../../utils/sanity'
import { useRef } from 'react'
import { useSiteHeightAndWidth, useToText } from '../../libs/hooks'
import { Container } from '../styles/Styles'
import axios from 'axios'

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MEDIUM_URL}`)

    return {
        props: {
            blog: data,
            sanityData: await sanityStaticProps({ query, context }),
        },
        revalidate: 10,
    }
}

export default function Index({ blog, sanityData }) {
    const {
        data: { site, landingPage, portfolio, contact },
    } = useSanityQuery(query, sanityData)

    const {
        state: { activeWindows, darkMode, focusWindow },
    } = useCtx()

    const siteRef = useRef<HTMLDivElement>(null)

    // This will return current page width
    const { width } = useSiteHeightAndWidth(siteRef)
    // This will return an array of all the blogs from clients medium
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

                {activeWindows.map(({ key }: WindowsProps, index: number) => (
                    <Window_
                        key={index}
                        index={key}
                        width={width}
                        blogInfo={blogInfo}
                        portfolioItems={portfolio}
                        contact={contact}
                    />
                ))}
                <Navbar navs={site.sites.nav} startMenu={site.sites.startButton} />
            </div>
        </Container>
    )
}
