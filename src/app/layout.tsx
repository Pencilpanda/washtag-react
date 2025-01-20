import { Karla, Inconsolata } from 'next/font/google'
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AuthProvider } from "@/components/auth-provider"
import "@/styles/globals.css"

const karla = Karla({ 
  subsets: ['latin'],
  variable: '--font-karla',
})

const inconsolata = Inconsolata({ 
  subsets: ['latin'],
  variable: '--font-inconsolata',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu" className={`${karla.variable} ${inconsolata.variable}`}>
      <body className="flex min-h-screen flex-col bg-[#252B2F] text-white">
        <AuthProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  )
}

