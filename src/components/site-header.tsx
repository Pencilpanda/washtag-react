'use client'

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Menu, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useAuth } from "@/components/auth-provider"

const navigation = [
  { name: "WEBSHOP", href: "/webshop" },
  { name: "LEXIKON", href: "/lexikon" },
  { name: "BLOG", href: "/blog" },
  { name: "KONTAKT", href: "/kontakt" },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1C1F26] px-4 md:px-6 border-t-4 border-t-[#C64746] h-[72px]">
      <div className="container flex h-full items-center justify-between px-0">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/washtag-header-logo-white-002-C1rE13g6brEQQyiJbHicxotaJFzkXA.svg"
            alt="washtag"
            width={140}
            height={46}
            className="h-[46px] w-auto"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <nav className="mr-6">
            <ul className="flex space-x-8">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium text-white hover:text-gray-300",
                      "transition-colors"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
            {user ? (
              <Button variant="ghost" size="icon" onClick={logout} className="text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                <LogOut className="h-6 w-6" />
                <span className="sr-only">Logout</span>
              </Button>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="icon" className="text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                  <User className="h-6 w-6" />
                  <span className="sr-only">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="px-0 text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-[#1C1F26]">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/cart"
                className="flex items-center text-sm font-medium text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart
              </Link>
              {user ? (
                <Button variant="ghost" className="justify-start p-0" onClick={() => { logout(); setIsOpen(false); }}>
                  <LogOut className="mr-2 h-5 w-5" />
                  <span className="text-sm font-medium text-white">Logout</span>
                </Button>
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center text-sm font-medium text-white hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="mr-2 h-5 w-5" />
                  Login
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

