import { AppProps } from 'next/app'
import '../styles/globals.css'
import original from 'react95/dist/themes/original'
import { ThemeProvider } from 'styled-components'
import { AppProvider } from '../../store'

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
