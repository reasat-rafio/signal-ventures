//@ts-nocheck
// TODO fix typescript errors
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
// import { Window_ } from '../components/window/Window'
// import { Home } from '../components/landing/Home'
import dynamic from 'next/dynamic'

import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useSiteHeightAndWidth } from '../../libs/hooks'
import { query } from '../../libs/query'
import { useCtx } from '../../store'
import { sanityStaticProps, useSanityQuery } from '../../utils/sanity'
// import { StartMenuNavbar } from '../components/navbar/StartMenuNavbar'
import { Container } from '../styles/Styles'
// import { DesktopNavs } from '../components/navbar/DesktopNavs'
import { ThemeProvider } from 'styled-components'
import { dark_mode, light_mode } from '../../libs/theme'
import { SET_MODE } from '../../store/types'
// import { AppCanvas } from '../components/Canvas/AppCanvas'
import clsx from 'clsx'
// import { Loading } from '../components/Loading/Loading'
// import { Modal } from '../components/Modal/Modal'
const StartMenuNavbar = dynamic(() =>
    import('../components/navbar/StartMenuNavbar').then((mod) => mod.StartMenuNavbar),
)
const Modal = dynamic(() => import('../components/Modal/Modal').then((mod) => mod.Modal))
const Loading = dynamic(() => import('../components/Loading/Loading').then((mod) => mod.Loading))
const AppCanvas = dynamic(() =>
    import('../components/Canvas/AppCanvas').then((mod) => mod.AppCanvas),
)
const Home = dynamic(() => import('../components/landing/Home').then((mod) => mod.Home))
const DesktopNavs = dynamic(() =>
    import('../components/navbar/DesktopNavs').then((mod) => mod.DesktopNavs),
)
const Window_ = dynamic(() => import('../components/window/Window').then((mod) => mod.Window_))
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MEDIUM_URL}`)
    return {
        props: {
            blog: data,
            locale: context.locale,
            sanityData: await sanityStaticProps({
                query,
                context,
                params: {
                    locale: context.locale,
                },
                authenticated: true,
            }),
        },
        revalidate: 10,
    }
}

export default function Index({ blog, sanityData, locale }) {
    const {
        data: { site, landingPage, portfolio, contact, modal, articles, seo, more },
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

    // This will return current page width
    const siteRef = useRef<HTMLDivElement | null>(null)
    const { width } = useSiteHeightAndWidth(siteRef)

    return (
        <ThemeProvider theme={darkMode ? dark_mode : light_mode}>
            <Container ref={siteRef} darkMode={darkMode}>
                <NextSeo title={seo.title} description={seo.description} />
                <div
                    className={clsx(
                        'container mx-auto flex flex-col items-center',
                        darkMode ? 'dark_scrollbar' : 'light_scrollbar',
                    )}
                >
                    <Home
                        title={landingPage.heading}
                        description={landingPage.description}
                        darkLogo={site.logos.dark_logo}
                        lightLogo={site.logos.light_logo}
                        button={landingPage.ctaButton}
                        navs={site.nav.menu}
                    />

                    {activeWindows.length > 0 &&
                        activeWindows.map(({ key }: WindowsProps, index: number) => (
                            <Window_
                                key={index}
                                index={key}
                                width={width}
                                portfolioItems={portfolio}
                                contact={contact}
                                blogItems={blog.items}
                                blogFeeds={blog.feed}
                                navs={site.nav.menu}
                                articlesPlaceholder={articles}
                                portfolioActionButton={more.portfolioActionButton}
                            />
                        ))}
                    <DesktopNavs navs={site.nav.menu} />
                    <StartMenuNavbar
                        navs={site.nav.menu}
                        startMenu={site.startButton}
                        languageSwitcher={site.languageSwitcher}
                        locale={locale}
                    />
                    <AppCanvas />
                    <Loading />
                    <Modal modal={modal} />
                </div>
            </Container>
        </ThemeProvider>
    )
}
