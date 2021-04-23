import { groq } from 'next-sanity'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { Window_ } from '../components/window/Window'
import { Home } from '../components/landing/Home'
import { Navbar } from '../components/navbar/Navbar'
import { useCtx } from '../../store'
import { siteQuery } from '../../libs/query'
import { sanityStaticProps, useSanityQuery } from '../../utils/sanity'
import { useRef } from 'react'
import { useSiteHeightAndWidth, useToText } from '../../libs/hooks'
import { Container } from '../styles/Styles'
import axios from 'axios'
import { withDimensions } from 'sanity-react-extra'

const query = groq`{
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

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MEDIUM_URL}`)

    return {
        props: {
            blog: data,
            sanityData: await sanityStaticProps({ query, context }),
        },
        revalidate: 1,
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
    const { width } = useSiteHeightAndWidth(siteRef)

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
