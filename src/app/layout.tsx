/* eslint-disable react/react-in-jsx-scope */
import './globals.css'
import type { Metadata } from 'next'
import Header from '../components/Header/page';
import Footer from '../components/Footer/page';

export const metadata: Metadata = {
  title: 'CorpInsights Collective',
  description: 'Your authentic, tech-savvy growth partner for B2B companies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-text font-sans">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
