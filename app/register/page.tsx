"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsappPreferred: false,
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur de validation",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 6 caractères.",
        variant: "destructive",
      })
      return
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Conditions non acceptées",
        description: "Veuillez accepter les conditions d'utilisation pour continuer.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // TODO: Remplacer par un appel API réel
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Compte créé avec succès !",
        description: "Votre compte a été créé. Vous allez être redirigé vers la page de connexion.",
        variant: "default",
      })

      // Redirection vers la page de connexion
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (error) {
      toast({
        title: "Erreur lors de l'inscription",
        description: "Une erreur est survenue. Veuillez réessayer.",
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

        {/* Card d'inscription */}
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

          <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Créer un compte</h1>
          <p className="text-sm text-foreground/60 mb-8 text-center">
            Rejoignez DIGITAL Form Art pour valoriser votre parcours professionnel
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom et prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Prénom"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                  Nom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Nom"
                  />
                </div>
              </div>
            </div>

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

            {/* Téléphone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Numéro de téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={formData.whatsappPreferred}
                  onChange={(e) => setFormData({ ...formData, whatsappPreferred: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm text-foreground/70">
                  Je préfère être contacté via WhatsApp
                </span>
              </label>
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Conditions */}
            <div>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm text-foreground/70">
                  J'accepte les{" "}
                  <Link href="/terms" className="text-accent hover:text-link-hover">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" className="text-accent hover:text-link-hover">
                    politique de confidentialité
                  </Link>
                </span>
              </label>
            </div>

            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Création du compte..." : "Créer mon compte"}
            </button>
          </form>

          {/* Lien vers connexion */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/60">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="text-accent hover:text-link-hover font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
