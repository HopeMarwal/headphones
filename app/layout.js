import './globals.css'
import { Rubik } from 'next/font/google'
// Components
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Headphones',
  description: 'Store headphones online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
