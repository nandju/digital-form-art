"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, Lock, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  // Vérifier si déjà connecté en tant qu'admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (isAdmin === "true") {
      router.push("/admin")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation de la connexion admin - À remplacer par un appel API réel
    try {
      // TODO: Remplacer par un appel API réel
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Pour la démo, accepter admin@digitalformart.com / admin123
      // Dans un vrai projet, cela viendrait d'une base de données
      if (
        formData.email === "admin@digitalformart.com" &&
        formData.password === "admin123"
      ) {
        // Stocker l'état de connexion admin
        localStorage.setItem("isAdmin", "true")
        localStorage.setItem("adminEmail", formData.email)

        toast({
          title: "Connexion réussie !",
          description: "Vous allez être redirigé vers l'espace administrateur.",
          variant: "default",
        })

        // Redirection vers l'espace admin
        setTimeout(() => {
          router.push("/admin")
        }, 1000)
      } else {
        throw new Error("Identifiants incorrects")
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo et retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Retour à l'accueil</span>
        </Link>

        {/* Card de connexion */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo_sans_fond.png"
                alt="DIGITAL Form Art"
                width={60}
                height={60}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-foreground">DIGITAL Form Art</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold text-foreground text-center">Connexion Admin</h1>
          </div>
          <p className="text-sm text-foreground/60 mb-8 text-center">
            Accédez à l'espace administrateur
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Adresse e-mail administrateur
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="admin@digitalformart.com"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Note pour la démo */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-xs text-foreground/70">
              <strong>Note (Démo) :</strong> Utilisez <code className="bg-background px-1 rounded">admin@digitalformart.com</code> / <code className="bg-background px-1 rounded">admin123</code>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
