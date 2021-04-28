import { GetStaticProps, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { Window_ } from '../components/window/Window'
import { Home } from '../components/landing/Home'
import { StartMenuNavbar } from '../components/navbar/StartMenuNavbar'
import { useCtx } from '../../store'
import { query } from '../../libs/query'
import { sanityStaticProps, useSanityQuery } from '../../utils/sanity'
import { useEffect, useRef } from 'react'
import { useSiteHeightAndWidth, useToText } from '../../libs/hooks'
import { Container } from '../styles/Styles'
import axios from 'axios'
import { DesktopNavs } from '../components/navbar/DesktopNavs'
import { ThemeProvider } from 'styled-components'
import { dark_mode, light_mode } from '../../libs/theme'
import { SET_MODE } from '../../store/types'
import { AppCanvas } from '../components/Canvas/AppCanvas'

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MEDIUM_URL}`)

    return {
        props: {
            blog: data,

            sanityData: await sanityStaticProps({
                query,
                context,
                params: {
                    locale: context.locale,
                },
            }),
        },
        revalidate: 10,
    }
}

export default function Index({ blog, sanityData }) {
    const {
        data: { site, landingPage, portfolio, contact },
    } = useSanityQuery(query, sanityData)

    const {
        dispatch,
        state: { activeWindows, darkMode },
    } = useCtx()

    useEffect(() => {
        const localData = localStorage.getItem('signal_ventures_active_mode')
        if (localData) {
            const mode = JSON.parse(localData)
            dispatch({
                type: SET_MODE,
                payload: mode,
            })
        }
    }, [])
    console.log(landingPage)

    // This will return current page width
    const siteRef = useRef<HTMLDivElement>(null)
    const { width } = useSiteHeightAndWidth(siteRef)
    // This will return an array of all the blogs from clients medium
    const { blogInfo } = useToText(blog.items, blog.feed)

    return (
        <ThemeProvider theme={darkMode ? dark_mode : light_mode}>
            <Container ref={siteRef} darkMode={darkMode}>
                <NextSeo title={landingPage.seo.title} description={landingPage.seo.description} />
                <div className="container mx-auto flex flex-col items-center ">
                    <Home
                        title={landingPage.heading}
                        description={landingPage.description}
                        darkLogo={site.sites.dark_logo}
                        lightLogo={site.sites.light_logo}
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
                    <DesktopNavs navs={site.sites.nav} />
                    <StartMenuNavbar navs={site.sites.nav} startMenu={site.sites.startButton} />
                    <AppCanvas />
                </div>
            </Container>
        </ThemeProvider>
    )
}
