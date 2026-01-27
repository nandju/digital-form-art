"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Download, FileText, Clock, CheckCircle, XCircle, ArrowLeft, Plus, Trash2, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null)

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

  const handleDeleteClick = (requestId: string) => {
    setRequestToDelete(requestId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (requestToDelete) {
      setRequests(requests.filter((r) => r.id !== requestToDelete))
      toast({
        title: "Demande supprimée",
        description: "Votre demande a été supprimée avec succès.",
        variant: "default",
      })
      setDeleteDialogOpen(false)
      setRequestToDelete(null)
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
          <p className="text-foreground/60">
            Suivez vos demandes de CV et lettres de motivation, et mettez à jour vos informations tant que la demande est en attente de traitement.
          </p>
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
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(request.status)}
                      <div>
                        <p className="font-medium text-foreground">
                          Demande du {new Date(request.date).toLocaleDateString("fr-FR")}
                        </p>
                        <p className="text-sm text-foreground/60">
                          Statut: {getStatusText(request.status)}
                        </p>
                        {request.status === "pending" && (
                          <p className="text-xs text-foreground/50 mt-1">
                            Vous pouvez encore modifier vos informations (expériences, âge, enfants, photo, diplômes, permis).
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {request.status === "completed" ? (
                        <>
                          <a
                            href={request.cvUrl || "#"}
                            download
                            className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors"
                            title="Télécharger le CV"
                          >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">CV</span>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              Télécharger le CV
                            </span>
                          </a>
                          <a
                            href={request.letterUrl || "#"}
                            download
                            className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors"
                            title="Télécharger la lettre"
                          >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Lettre</span>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              Télécharger la lettre
                            </span>
                          </a>
                        </>
                      ) : (
                        <>
                          <span className="text-xs sm:text-sm text-foreground/60">
                            {request.status === "in-progress"
                              ? "Traitement en cours..."
                              : "En attente de traitement"}
                          </span>
                          {request.status === "pending" && (
                            <>
                              <Link
                                href={`/works/cv-lettre-motivation/form?mode=update&requestId=${request.id}`}
                                className="group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity min-w-[40px] sm:min-w-0"
                                title="Mettre à jour ma demande"
                              >
                                <Edit className="h-4 w-4 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Mettre à jour</span>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                  Mettre à jour ma demande
                                </span>
                              </Link>
                              <button
                                onClick={() => handleDeleteClick(request.id)}
                                className="group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors min-w-[40px] sm:min-w-0"
                                title="Supprimer la demande"
                              >
                                <Trash2 className="h-4 w-4 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Supprimer</span>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                  Supprimer la demande
                                </span>
                              </button>
                            </>
                          )}
                        </>
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

      {/* Modal de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription className="pt-2">
              Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible et vous ne pourrez plus modifier ou accéder à cette demande.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="w-full sm:w-auto px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity"
            >
              Supprimer définitivement
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
