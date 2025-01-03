import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {Popup} from "../components/UI/Popup";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    <Popup/>
    </QueryClientProvider>
  </>)
}

export default MyApp
