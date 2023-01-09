// @ts-nocheck
import { AppProps } from 'next/app'
import '../styles/globals.css'
import { AppProvider } from '../../store'
import { imageUrlBuilder } from '../../utils/sanity'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    let faviconImage: string | null = null

    if (pageProps.sanityData?.data?.site.logos.favicon) {
        faviconImage = imageUrlBuilder
            .image(pageProps.sanityData?.data?.site.logos.favicon)
            .width(256)
            .height(256)
            .url()
    }

    return (
        <>
            {faviconImage && (
                <Head>
                    <link rel="icon" type="image/png" href={faviconImage} />
                </Head>
            )}
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </>
    )
}
