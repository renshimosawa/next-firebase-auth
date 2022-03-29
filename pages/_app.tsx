import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../framework/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
export default MyApp
