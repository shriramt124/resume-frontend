import { Inter } from 'next/font/google'
import '../styles/globals.css'
const inter = Inter({ subsets: ['latin'] })
import { AuthProvider } from '../context/AuthContext'
export default function App({ Component, pageProps }) {
  return (
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
  )
}
