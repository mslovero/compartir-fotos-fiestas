import type { Metadata } from 'next'
import { Montserrat, Open_Sans, Nunito, Great_Vibes } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700']
})
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans'
})
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '600', '700']
})
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-greatvibes',
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Mis 15 Años - Galería de Fotos',
  description: 'Comparte tus fotos de la fiesta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${openSans.variable} ${nunito.variable} ${greatVibes.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
