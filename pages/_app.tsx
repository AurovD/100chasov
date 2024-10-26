import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {Popup} from "../components/UI/Popup";

function MyApp({ Component, pageProps }: AppProps) {
  return (<><Component {...pageProps} /><Popup/></>)
}

export default MyApp
