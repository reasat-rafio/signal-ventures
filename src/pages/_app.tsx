import { AppProps } from 'next/app'
import '../styles/globals.css'
import { AppProvider } from '../../store'
import { imageUrlBuilder } from '../../utils/sanity'

export default function App({ Component, pageProps }: AppProps) {
    let faviconImage: string | null = null
    if (pageProps.data?.site.favicon) {
        faviconImage = imageUrlBuilder
            .image(pageProps.sanityData?.data?.site.favicon)
            .width(256)
            .height(256)
            .url()
    }

    return (
        <div>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </div>
    )
}
