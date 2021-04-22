import { AppProps } from 'next/app'
import '../styles/globals.css'
import light_theme from 'react95/dist/themes/original'
import { ThemeProvider } from 'styled-components'
import { AppProvider, useCtx } from '../../store'
import { dark_theme } from '../../libs/theme'

export default function App({ Component, pageProps }: AppProps) {
    const {
        state: { darkMode },
    } = useCtx()

    return (
        <div>
            <AppProvider>
                <ThemeProvider theme={light_theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </AppProvider>
        </div>
    )
}
