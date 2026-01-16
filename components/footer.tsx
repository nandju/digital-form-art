import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo_sans_fond.png"
                alt="DIGITAL Form Art"
                width={60}
                height={60}
                className="object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-foreground/60 mb-6">
              Restez informé des dernières actualités, conseils professionnels et offres exclusives pour votre carrière.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Adresse email"
                className="flex-1 px-4 py-2.5 rounded-l-full border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-r-full bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">PAGES</h4>
            <nav className="flex flex-col gap-3">
              {["À propos", "Services", "Témoignages", "Blog", "FAQ"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-").replace("é", "e")}`}
                  className="text-sm text-foreground/60 hover:text-accent transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resource */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">RESSOURCES</h4>
            <nav className="flex flex-col gap-3">
              {["Témoignages", "Tarifs", "Contact", "Mentions légales", "Guide de style"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-").replace("é", "e")}`}
                  className="text-sm text-foreground/60 hover:text-accent transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">NOTRE ADRESSE</h4>
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="h-4 w-4 text-foreground/60 mt-0.5" />
              <p className="text-sm text-foreground/60">France</p>
            </div>

            <h4 className="text-sm font-semibold text-foreground mb-4">CONTACTEZ-NOUS</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-foreground/60" />
                <a href="tel:+33123456789" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-foreground/60" />
                <a
                  href="mailto:contact@digitalformart.com"
                  className="text-sm text-foreground/60 hover:text-accent transition-colors"
                >
                  contact@digitalformart.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/50">©2025 DIGITAL Form Art. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-sm text-foreground/50 hover:text-accent transition-colors">
              Conditions générales
            </Link>
            <Link href="/privacy" className="text-sm text-foreground/50 hover:text-accent transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/cookies" className="text-sm text-foreground/50 hover:text-accent transition-colors">
              Politique des cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}