"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Download, FileText, Clock, CheckCircle, XCircle, ArrowLeft, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Données mockées - à remplacer par des appels API
const mockRequests = [
  {
    id: "1",
    date: "2025-01-15",
    status: "completed",
    cvUrl: "/cv-example.pdf",
    letterUrl: "/letter-example.pdf",
  },
  {
    id: "2",
    date: "2025-02-01",
    status: "in-progress",
    cvUrl: null,
    letterUrl: null,
  },
  {
    id: "3",
    date: "2025-02-10",
    status: "pending",
    cvUrl: null,
    letterUrl: null,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [requests, setRequests] = useState(mockRequests)

  // Vérifier l'authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      toast({
        title: "Accès non autorisé",
        description: "Veuillez vous connecter pour accéder à votre espace personnel.",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [router, toast])

  // Vérifier s'il y a une nouvelle demande créée
  useEffect(() => {
    const newRequest = sessionStorage.getItem("newRequestCreated")
    if (newRequest === "true") {
      toast({
        title: "Demande créée avec succès !",
        description: "Votre demande de CV & Lettre de motivation a été soumise. Elle sera traitée sous peu.",
        variant: "default",
      })
      sessionStorage.removeItem("newRequestCreated")
    }
  }, [toast])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-warning" />
      case "pending":
        return <XCircle className="h-5 w-5 text-foreground/40" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé"
      case "in-progress":
        return "En cours"
      case "pending":
        return "En attente"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Retour à l'accueil</span>
            </Link>
            <Link href="/works/cv-lettre-motivation/form" className="text-sm text-accent hover:text-link-hover">
              Nouvelle demande
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mon espace personnel</h1>
          <p className="text-foreground/60">Suivez vos demandes de CV et lettres de motivation</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Total des demandes</p>
                <p className="text-2xl font-bold text-foreground">{requests.length}</p>
              </div>
              <FileText className="h-8 w-8 text-accent" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">En cours</p>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter((r) => r.status === "in-progress").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Terminées</p>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter((r) => r.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </div>
        </div>

        {/* Requests list */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Mes demandes</h2>
          </div>

          {requests.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
              <p className="text-foreground/60 mb-4">Aucune demande pour le moment</p>
              <Link
                href="/works/cv-lettre-motivation/form"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90"
              >
                Créer une nouvelle demande
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {requests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-card/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(request.status)}
                      <div>
                        <p className="font-medium text-foreground">
                          Demande du {new Date(request.date).toLocaleDateString("fr-FR")}
                        </p>
                        <p className="text-sm text-foreground/60">
                          Statut: {getStatusText(request.status)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {request.status === "completed" ? (
                        <>
                          <a
                            href={request.cvUrl || "#"}
                            download
                            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            CV
                          </a>
                          <a
                            href={request.letterUrl || "#"}
                            download
                            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            Lettre
                          </a>
                        </>
                      ) : (
                        <span className="text-sm text-foreground/60">
                          {request.status === "in-progress"
                            ? "Traitement en cours..."
                            : "En attente de traitement"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA pour nouvelle demande */}
        <div className="mt-8 text-center">
          <Link
            href="/works/cv-lettre-motivation/form"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            {requests.length > 0
              ? "Nouvelle demande de CV & Lettre de motivation"
              : "Créer ma première demande"}
          </Link>
        </div>
      </div>
    </div>
  )
}
