import { AppProps } from 'next/app'
import '../styles/globals.css'
// import light_theme from 'react95/dist/themes/vapowave'

import { AppProvider, useCtx } from '../../store'

export default function App({ Component, pageProps }: AppProps) {
    const {
        state: { darkMode },
    } = useCtx()
    console.log(darkMode)
    return (
        <div>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </div>
    )
}
