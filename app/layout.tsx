import './globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from "./providers"
import "@rainbow-me/rainbowkit/styles.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Liblock',
  description: 'Liblock is a Dapp built to share',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
    </html>
  )
}
