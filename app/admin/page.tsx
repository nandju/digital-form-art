"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, Upload, Users, Search, Filter, Download } from "lucide-react"

// Données mockées - à remplacer par des appels API
const mockRequests = [
  {
    id: "1",
    userName: "Jean Dupont",
    email: "jean.dupont@email.com",
    date: "2025-02-10",
    status: "pending",
    cvUrl: null,
    letterUrl: null,
  },
  {
    id: "2",
    userName: "Marie Martin",
    email: "marie.martin@email.com",
    date: "2025-02-08",
    status: "in-progress",
    cvUrl: null,
    letterUrl: null,
  },
  {
    id: "3",
    userName: "Pierre Bernard",
    email: "pierre.bernard@email.com",
    date: "2025-02-05",
    status: "completed",
    cvUrl: "/cv-example.pdf",
    letterUrl: "/letter-example.pdf",
  },
]

export default function AdminPage() {
  const [requests] = useState(mockRequests)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"requests" | "users">("requests")

  const getRequestById = (id: string) => {
    return requests.find((r) => r.id === id)
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
            <h1 className="text-xl font-bold text-foreground">Espace Administrateur</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "requests"
                ? "text-accent border-b-2 border-accent"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Demandes
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "users"
                ? "text-accent border-b-2 border-accent"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Utilisateurs
          </button>
        </div>

        {activeTab === "requests" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                  <input
                    type="text"
                    placeholder="Rechercher une demande..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card">
                  <Filter className="h-4 w-4" />
                  Filtrer
                </button>
              </div>
            </div>

            {/* Requests table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-card border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {requests.map((request) => (
                      <tr key={request.id} className="hover:bg-card/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{request.userName}</p>
                            <p className="text-sm text-foreground/60">{request.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/70">
                          {new Date(request.date).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              request.status === "completed"
                                ? "bg-success/20 text-success"
                                : request.status === "in-progress"
                                  ? "bg-warning/20 text-warning"
                                  : "bg-foreground/10 text-foreground/60"
                            }`}
                          >
                            {request.status === "completed"
                              ? "Terminé"
                              : request.status === "in-progress"
                                ? "En cours"
                                : "En attente"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedRequest(request.id)}
                              className="px-3 py-1 text-sm border border-border rounded-lg text-foreground hover:bg-card"
                            >
                              Voir détails
                            </button>
                            {request.status === "pending" && (
                              <button className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-lg hover:opacity-90">
                                <Upload className="h-4 w-4 inline mr-1" />
                                Upload
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Gestion des utilisateurs</h2>
            <p className="text-foreground/60">Fonctionnalité à venir...</p>
            {/* TODO: Implémenter la liste des utilisateurs avec possibilité de bloquer/débloquer */}
          </div>
        )}

        {/* Modal pour upload (à implémenter) */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Upload CV & Lettre de motivation
              </h3>
              <p className="text-sm text-foreground/60 mb-4">
                Demande de: {getRequestById(selectedRequest)?.userName}
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CV (PDF)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Lettre de motivation (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card"
                  >
                    Annuler
                  </button>
                  <button className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90">
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
