import { AppProps } from 'next/app'
import '../styles/globals.css'
import { AppProvider } from '../../store'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </div>
    )
}
