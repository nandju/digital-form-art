"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation de la connexion - À remplacer par un appel API réel
    try {
      // TODO: Remplacer par un appel API réel
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validation simple pour la démo
      if (formData.email && formData.password) {
        // Stocker l'état de connexion (dans un vrai projet, utiliser un système d'auth)
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userEmail", formData.email)

        toast({
          title: "Connexion réussie !",
          description: "Vous allez être redirigé vers votre espace personnel.",
          variant: "default",
        })

        // Redirection vers le dashboard après un court délai
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        throw new Error("Email et mot de passe requis")
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

          <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Connexion</h1>
          <p className="text-sm text-foreground/60 mb-8 text-center">
            Accédez à votre espace personnel
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Adresse e-mail
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
                  placeholder="votre@email.com"
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

            {/* Mot de passe oublié */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm text-foreground/70">Se souvenir de moi</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-accent hover:text-link-hover transition-colors"
              >
                Mot de passe oublié ?
              </Link>
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

          {/* Lien vers inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/60">
              Vous n'avez pas de compte ?{" "}
              <Link href="/register" className="text-accent hover:text-link-hover font-medium">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
