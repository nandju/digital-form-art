"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, ArrowUpRight, User } from "lucide-react"

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Vérifier l'authentification
    const checkAuth = () => {
      const auth = sessionStorage.getItem("isAuthenticated")
      setIsAuthenticated(auth === "true")
    }

    checkAuth()
    window.addEventListener("scroll", handleScroll)
    // Vérifier l'auth à chaque changement de sessionStorage
    window.addEventListener("storage", checkAuth)
    // Vérifier toutes les secondes pour les changements dans le même onglet
    const interval = setInterval(checkAuth, 1000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", checkAuth)
      clearInterval(interval)
    }
  }, [])

  const navItems = [
    { name: "ACCUEIL", href: "#home" },
    { name: "À PROPOS", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "TÉMOIGNAGES", href: "#testimonials" },
    { name: "CONTACT", href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`mx-auto max-w-7xl transition-all duration-300 ${
          scrolled
            ? "mt-4 mx-4 px-6 py-3 shadow-lg bg-background/95 backdrop-blur-md rounded-lg"
            : "px-6 py-5 bg-background/90 backdrop-blur-md mx-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-all duration-300"
          >
            <Image
              src="/images/logo_sans_fond.png"
              alt="DIGITAL Form Art"
              width={scrolled ? 70 : 80}
              height={scrolled ? 70 : 80}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation - visible à partir de lg (tablette et desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions - visible à partir de lg (tablette et desktop) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <User className="h-4 w-4" />
                Mon espace
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 rounded-full border border-foreground text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors whitespace-nowrap"
              >
                <User className="h-4 w-4" />
                Connexion
              </Link>
            )}
            <a
              href="https://wa.me/2250708091011"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-foreground px-4 xl:px-5 py-2 xl:py-2.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors cursor-pointer whitespace-nowrap"
            >
              Contactez-nous
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile/Tablet Menu Button - visible jusqu'à lg */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile/Tablet Menu - visible jusqu'à lg */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-6">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-medium w-fit hover:opacity-90 transition-opacity"
                >
                  <User className="h-4 w-4" />
                  Mon espace
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground text-sm font-medium text-foreground w-fit hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                >
                  <User className="h-4 w-4" />
                  Connexion
                </Link>
              )}
              <a
                href="https://wa.me/2250708091011"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium text-foreground w-fit hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors cursor-pointer"
              >
                Contactez-nous
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}