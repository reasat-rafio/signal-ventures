import { AppProps } from 'next/app'
import { AppProvider } from '../store'
import '../styles/globals.css'
import original from 'react95/dist/themes/original'
import { ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <AppProvider>
                <ThemeProvider theme={original}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </AppProvider>
        </div>
    )
}
