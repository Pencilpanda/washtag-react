"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const footerLinks = {
  WEBSHOP: [
    { name: "Mosókártyák", href: "/webshop/mosokartyak" },
  ],
  LEXIKON: [
    { name: "Mosási Programok", href: "/lexikon/mosasi-programok" },
    { name: "Használati Útmutatók", href: "/lexikon/hasznalati-utmutatok" },
    { name: "Kérdések és Válaszok", href: "/lexikon/kerdesek-es-valaszok" },
  ],
  GYORSLINK: [
    { name: "Webshop", href: "/webshop" },
    { name: "Lexikon", href: "/lexikon" },
    { name: "Blog", href: "/blog" },
    { name: "Kontakt", href: "/kontakt" },
  ],
  HIVATALOS: [
    { name: "Adatkezelési Irányelvek", href: "/adatkezelesi-iranyelvek" },
    { name: "Felhasználási Feltételek", href: "/felhasznalasi-feltetelek" },
  ],
}

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", { name, email })
  }

  return (
    <footer className="relative font-inconsolata">
      {/* Newsletter Section */}
      <div className="bg-[#1E2327] py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-8 text-2xl font-bold text-white font-karla">HÍRLEVÉL FELIRATKOZÁS</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Név"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-white/90 placeholder:text-gray-500"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/90 placeholder:text-gray-500"
                required
              />
              <Button 
                type="submit" 
                className="h-12 w-full bg-[#1CBA8D] text-white hover:bg-[#19A67E]"
              >
                Feliratkozás
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-[#1C1F26] py-12">
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-lg font-semibold text-white font-karla">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="container mt-8 flex justify-center space-x-6 px-4 md:px-6">
          <Link
            href="https://facebook.com"
            className="text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="https://instagram.com"
            className="text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://tiktok.com"
            className="text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg 
              className="h-6 w-6" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span className="sr-only">TikTok</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

