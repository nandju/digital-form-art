"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  FileText,
  Upload,
  Users,
  Search,
  Filter,
  Download,
  X,
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  Briefcase,
  Code,
  Heart,
  Eye,
  EyeOff,
  Ban,
  CheckCircle2,
  Trash2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Types
interface RequestFormData {
  // Informations personnelles
  firstName: string
  lastName: string
  age: string
  email: string
  phone: string
  maritalStatus: string
  photo: string | null

  // Profil professionnel
  presentation: string
  objective: string
  field: string

  // Diplômes
  diplomas: Array<{
    id: string
    diploma: string
    year: string
    institution: string
    specialty: string
  }>

  // Expériences
  experiences: Array<{
    id: string
    position: string
    company: string
    startMonth: string
    startYear: string
    endMonth: string
    endYear: string
    current: boolean
    tasks: string
  }>

  // Compétences
  itSkills: string
  software: string
  languages: string
  technicalSkills: string
  organizationalSkills: string

  // Aptitudes
  organization: boolean
  teamwork: boolean
  punctuality: boolean
  rigor: boolean
  otherQualities: string

  // Centres d'intérêt
  hobbies: string
  sports: string
  cultural: string
}

interface Request {
  id: string
  userName: string
  email: string
  phone: string
  date: string
  type: "creation" | "amelioration"
  status: "pending" | "in-progress" | "completed"
  assignedAdmin: string | null
  completedBy: string | null
  completedAt: string | null
  cvUrl: string | null
  letterUrl: string | null
  formData: RequestFormData
}

interface AdminUser {
  id: string
  name: string
  email: string
}

interface RegularUser {
  id: string
  name: string
  email: string
  phone: string
  whatsappPreferred: boolean
  isBlocked: boolean
  requestsCount: number
  createdAt: string
}

// Données mockées - à remplacer par des appels API
const mockRequests: Request[] = [
  {
    id: "1",
    userName: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    date: "2025-02-10",
    type: "creation",
    status: "pending",
    assignedAdmin: null,
    completedBy: null,
    completedAt: null,
    cvUrl: null,
    letterUrl: null,
    formData: {
      firstName: "Jean",
      lastName: "Dupont",
      age: "28",
      email: "jean.dupont@email.com",
      phone: "+33 6 12 34 56 78",
      maritalStatus: "single",
      photo: null,
      presentation: "Développeur web passionné",
      objective: "Évoluer dans le développement full-stack",
      field: "Développement web",
      diplomas: [
        {
          id: "1",
          diploma: "Master Informatique",
          year: "2020",
          institution: "Université Paris",
          specialty: "Développement web",
        },
      ],
      experiences: [
        {
          id: "1",
          position: "Développeur Frontend",
          company: "Tech Corp",
          startMonth: "01",
          startYear: "2021",
          endMonth: "12",
          endYear: "2023",
          current: false,
          tasks: "Développement d'applications React",
        },
      ],
      itSkills: "Windows, Linux, macOS",
      software: "VS Code, Git, Docker",
      languages: "JavaScript, TypeScript, Python",
      technicalSkills: "React, Node.js, MongoDB",
      organizationalSkills: "Gestion de projet, travail d'équipe",
      organization: true,
      teamwork: true,
      punctuality: true,
      rigor: true,
      otherQualities: "Curieux, autonome",
      hobbies: "Lecture, cinéma",
      sports: "Football, course",
      cultural: "Voyages",
    },
  },
  {
    id: "2",
    userName: "Marie Martin",
    email: "marie.martin@email.com",
    phone: "+33 6 98 76 54 32",
    date: "2025-02-12",
    type: "amelioration",
    status: "pending",
    assignedAdmin: null,
    completedBy: null,
    completedAt: null,
    cvUrl: null,
    letterUrl: null,
    formData: {
      firstName: "Marie",
      lastName: "Martin",
      age: "32",
      email: "marie.martin@email.com",
      phone: "+33 6 98 76 54 32",
      maritalStatus: "married",
      photo: null,
      presentation: "Designer UX/UI",
      objective: "Rejoindre une équipe créative",
      field: "Design",
      diplomas: [],
      experiences: [],
      itSkills: "",
      software: "",
      languages: "",
      technicalSkills: "",
      organizationalSkills: "",
      organization: false,
      teamwork: false,
      punctuality: false,
      rigor: false,
      otherQualities: "",
      hobbies: "",
      sports: "",
      cultural: "",
    },
  },
  {
    id: "3",
    userName: "Pierre Bernard",
    email: "pierre.bernard@email.com",
    phone: "+33 6 11 22 33 44",
    date: "2025-02-05",
    type: "creation",
    status: "completed",
    assignedAdmin: "Admin 1",
    completedBy: "Admin 1",
    completedAt: "2025-02-07",
    cvUrl: "/cv-example.pdf",
    letterUrl: "/letter-example.pdf",
    formData: {
      firstName: "Pierre",
      lastName: "Bernard",
      age: "35",
      email: "pierre.bernard@email.com",
      phone: "+33 6 11 22 33 44",
      maritalStatus: "single",
      photo: null,
      presentation: "Comptable expérimenté",
      objective: "Évoluer vers un poste de direction",
      field: "Comptabilité",
      diplomas: [],
      experiences: [],
      itSkills: "",
      software: "",
      languages: "",
      technicalSkills: "",
      organizationalSkills: "",
      organization: false,
      teamwork: false,
      punctuality: false,
      rigor: false,
      otherQualities: "",
      hobbies: "",
      sports: "",
      cultural: "",
    },
  },
]

const mockUsers: RegularUser[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    whatsappPreferred: true,
    isBlocked: false,
    requestsCount: 1,
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie.martin@email.com",
    phone: "+33 6 98 76 54 32",
    whatsappPreferred: false,
    isBlocked: false,
    requestsCount: 2,
    createdAt: "2025-01-20",
  },
  {
    id: "3",
    name: "Pierre Bernard",
    email: "pierre.bernard@email.com",
    phone: "+33 6 11 22 33 44",
    whatsappPreferred: true,
    isBlocked: false,
    requestsCount: 1,
    createdAt: "2025-01-25",
  },
]

const currentAdmin: AdminUser = {
  id: "1",
  name: "Admin 1",
  email: "admin@digitalformart.com",
}

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [requests, setRequests] = useState<Request[]>(mockRequests)
  const [users, setUsers] = useState<RegularUser[]>(mockUsers)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "detail">("list")
  const [activeTab, setActiveTab] = useState<"requests" | "users">("requests")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [uploadFiles, setUploadFiles] = useState({
    cv: null as File | null,
    letter: null as File | null,
  })
  const [blockDialogOpen, setBlockDialogOpen] = useState(false)
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const [userToAction, setUserToAction] = useState<RegularUser | null>(null)

  // Vérifier l'authentification admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin || isAdmin !== "true") {
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être administrateur pour accéder à cette page.",
        variant: "destructive",
      })
      router.push("/admin/login")
    }
  }, [router, toast])

  const getRequestById = (id: string) => {
    return requests.find((r) => r.id === id)
  }

  const handleAssignRequest = (requestId: string) => {
    setRequests(
      requests.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: "in-progress" as const,
            assignedAdmin: currentAdmin.name,
          }
        }
        return r
      }),
    )
    toast({
      title: "Demande assignée",
      description: "Vous avez pris en charge cette demande.",
      variant: "default",
    })
  }

  const handleCompleteRequest = (requestId: string) => {
    if (!uploadFiles.cv || !uploadFiles.letter) {
      toast({
        title: "Fichiers manquants",
        description: "Veuillez téléverser le CV et la lettre de motivation.",
        variant: "destructive",
      })
      return
    }

    setRequests(
      requests.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: "completed" as const,
            completedBy: currentAdmin.name,
            completedAt: new Date().toISOString(),
            cvUrl: URL.createObjectURL(uploadFiles.cv!),
            letterUrl: URL.createObjectURL(uploadFiles.letter!),
          }
        }
        return r
      }),
    )

    setUploadFiles({ cv: null, letter: null })
    setSelectedRequest(null)

    toast({
      title: "Demande finalisée",
      description: "Les documents ont été uploadés avec succès.",
      variant: "default",
    })
  }

  const handleBlockClick = (user: RegularUser) => {
    setUserToAction(user)
    setBlockDialogOpen(true)
  }

  const handleBlockConfirm = () => {
    if (userToAction) {
      const wasBlocked = userToAction.isBlocked
      setUsers(
        users.map((u) => {
          if (u.id === userToAction.id) {
            return { ...u, isBlocked: !u.isBlocked }
          }
          return u
        }),
      )
      toast({
        title: wasBlocked ? "Utilisateur débloqué" : "Utilisateur bloqué",
        description: `L'utilisateur ${userToAction.name} a été ${wasBlocked ? "débloqué" : "bloqué"}.`,
        variant: "default",
      })
      setBlockDialogOpen(false)
      setUserToAction(null)
    }
  }

  const handleDeleteUserClick = (user: RegularUser) => {
    setUserToAction(user)
    setDeleteUserDialogOpen(true)
  }

  const handleDeleteUserConfirm = () => {
    if (userToAction) {
      setUsers(users.filter((u) => u.id !== userToAction.id))
      toast({
        title: "Utilisateur supprimé",
        description: `L'utilisateur ${userToAction.name} a été supprimé définitivement.`,
        variant: "default",
      })
      setDeleteUserDialogOpen(false)
      setUserToAction(null)
    }
  }

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || req.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const request = selectedRequest ? getRequestById(selectedRequest) : null

  if (viewMode === "detail" && request) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setViewMode("list")
                  setSelectedRequest(null)
                }}
                className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Retour à la liste</span>
              </button>
              <div className="flex items-center gap-4">
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
                {request.status === "pending" && (
                  <button
                    onClick={() => handleAssignRequest(request.id)}
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 text-sm"
                  >
                    Prendre en charge
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-6">
            {/* Informations générales */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Informations générales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Client</p>
                  <p className="font-medium text-foreground">{request.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Email</p>
                  <p className="font-medium text-foreground">{request.email}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Téléphone</p>
                  <p className="font-medium text-foreground">{request.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Date de soumission</p>
                  <p className="font-medium text-foreground">
                    {new Date(request.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                {request.assignedAdmin && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Administrateur assigné</p>
                    <p className="font-medium text-foreground">{request.assignedAdmin}</p>
                  </div>
                )}
                {request.completedBy && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Finalisé par</p>
                    <p className="font-medium text-foreground">{request.completedBy}</p>
                    <p className="text-xs text-foreground/60 mt-1">
                      {request.completedAt
                        ? new Date(request.completedAt).toLocaleDateString("fr-FR")
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 1. Informations personnelles */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                1. Informations personnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Nom complet</p>
                  <p className="font-medium text-foreground">
                    {request.formData.firstName} {request.formData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Âge</p>
                  <p className="font-medium text-foreground">{request.formData.age} ans</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Email</p>
                  <p className="font-medium text-foreground">{request.formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Téléphone</p>
                  <p className="font-medium text-foreground">{request.formData.phone}</p>
                </div>
                {request.formData.maritalStatus && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Situation matrimoniale</p>
                    <p className="font-medium text-foreground">{request.formData.maritalStatus}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Profil professionnel */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                2. Profil professionnel
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Présentation personnelle</p>
                  <p className="text-foreground">{request.formData.presentation || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Objectif professionnel</p>
                  <p className="text-foreground">{request.formData.objective || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Domaine d'étude ou métier visé</p>
                  <p className="text-foreground">{request.formData.field || "Non renseigné"}</p>
                </div>
              </div>
            </div>

            {/* 3. Diplômes */}
            {request.formData.diplomas.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  3. Diplômes et formations
                </h2>
                <div className="space-y-4">
                  {request.formData.diplomas.map((diploma, idx) => (
                    <div key={diploma.id} className="border border-border rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-2">Diplôme {idx + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-foreground/60 mb-1">Diplôme</p>
                          <p className="text-foreground">{diploma.diploma}</p>
                        </div>
                        <div>
                          <p className="text-foreground/60 mb-1">Année</p>
                          <p className="text-foreground">{diploma.year}</p>
                        </div>
                        <div>
                          <p className="text-foreground/60 mb-1">Établissement</p>
                          <p className="text-foreground">{diploma.institution}</p>
                        </div>
                        {diploma.specialty && (
                          <div>
                            <p className="text-foreground/60 mb-1">Spécialité</p>
                            <p className="text-foreground">{diploma.specialty}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Expériences professionnelles */}
            {request.formData.experiences.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  4. Expériences professionnelles
                </h2>
                <div className="space-y-4">
                  {request.formData.experiences.map((exp, idx) => (
                    <div key={exp.id} className="border border-border rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-2">Expérience {idx + 1}</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-foreground/60 mb-1">Poste</p>
                            <p className="text-foreground">{exp.position}</p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/60 mb-1">Entreprise</p>
                            <p className="text-foreground">{exp.company}</p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/60 mb-1">Période</p>
                            <p className="text-foreground">
                              {exp.startMonth}/{exp.startYear} -{" "}
                              {exp.current
                                ? "En cours"
                                : `${exp.endMonth}/${exp.endYear}`}
                            </p>
                          </div>
                        </div>
                        {exp.tasks && (
                          <div>
                            <p className="text-sm text-foreground/60 mb-1">Tâches et responsabilités</p>
                            <p className="text-foreground">{exp.tasks}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Compétences */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Code className="h-5 w-5" />
                5. Compétences
              </h2>
              <div className="space-y-4">
                {request.formData.itSkills && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Compétences informatiques</p>
                    <p className="text-foreground">{request.formData.itSkills}</p>
                  </div>
                )}
                {request.formData.software && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Logiciels maîtrisés</p>
                    <p className="text-foreground">{request.formData.software}</p>
                  </div>
                )}
                {request.formData.languages && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Langages de programmation</p>
                    <p className="text-foreground">{request.formData.languages}</p>
                  </div>
                )}
                {request.formData.technicalSkills && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Compétences techniques</p>
                    <p className="text-foreground">{request.formData.technicalSkills}</p>
                  </div>
                )}
                {request.formData.organizationalSkills && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">
                      Compétences organisationnelles / relationnelles
                    </p>
                    <p className="text-foreground">{request.formData.organizationalSkills}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 6. Aptitudes */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Aptitudes et qualités personnelles
              </h2>
              <div className="space-y-2 mb-4">
                {request.formData.organization && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-foreground">Sens de l'organisation</span>
                  </div>
                )}
                {request.formData.teamwork && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-foreground">Esprit d'équipe</span>
                  </div>
                )}
                {request.formData.punctuality && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-foreground">Ponctualité</span>
                  </div>
                )}
                {request.formData.rigor && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-foreground">Rigueur</span>
                  </div>
                )}
              </div>
              {request.formData.otherQualities && (
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Autres qualités</p>
                  <p className="text-foreground">{request.formData.otherQualities}</p>
                </div>
              )}
            </div>

            {/* 7. Centres d'intérêt */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                7. Centres d'intérêt / Loisirs
              </h2>
              <div className="space-y-4">
                {request.formData.hobbies && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Loisirs</p>
                    <p className="text-foreground">{request.formData.hobbies}</p>
                  </div>
                )}
                {request.formData.sports && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Activités sportives</p>
                    <p className="text-foreground">{request.formData.sports}</p>
                  </div>
                )}
                {request.formData.cultural && (
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Intérêts culturels ou personnels</p>
                    <p className="text-foreground">{request.formData.cultural}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload section - si en cours */}
            {request.status === "in-progress" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Finaliser la demande
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">CV (PDF)</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setUploadFiles({ ...uploadFiles, cv: e.target.files?.[0] || null })
                      }
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
                      onChange={(e) =>
                        setUploadFiles({ ...uploadFiles, letter: e.target.files?.[0] || null })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <button
                    onClick={() => handleCompleteRequest(request.id)}
                    className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90"
                  >
                    Finaliser la demande
                  </button>
                </div>
              </div>
            )}

            {/* Documents finaux - si terminé */}
            {request.status === "completed" && request.cvUrl && request.letterUrl && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Documents finaux</h2>
                <div className="flex gap-4">
                  <a
                    href={request.cvUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card"
                  >
                    <Download className="h-4 w-4" />
                    Télécharger le CV
                  </a>
                  <a
                    href={request.letterUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card"
                  >
                    <Download className="h-4 w-4" />
                    Télécharger la lettre
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
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
            Demandes ({requests.length})
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
            Utilisateurs ({users.length})
          </button>
        </div>

        {activeTab === "requests" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-foreground/60 mb-1">Total</p>
                <p className="text-2xl font-bold text-foreground">{requests.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-foreground/60 mb-1">Nouvelles</p>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-foreground/60 mb-1">En cours</p>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter((r) => r.status === "in-progress").length}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-foreground/60 mb-1">Terminées</p>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter((r) => r.status === "completed").length}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                  <input
                    type="text"
                    placeholder="Rechercher une demande..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">Nouvelles</option>
                  <option value="in-progress">En cours</option>
                  <option value="completed">Terminées</option>
                </select>
              </div>
            </div>

            {/* Requests table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-card border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Administrateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredRequests.map((request) => (
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
                        <td className="px-6 py-4 text-sm text-foreground/70">
                          {request.type === "amelioration" ? "Amélioration de CV" : "Nouvelle demande"}
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
                        <td className="px-6 py-4 text-sm text-foreground/70">
                          {request.assignedAdmin || "-"}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedRequest(request.id)
                              setViewMode("detail")
                            }}
                            className="group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-border rounded-lg text-foreground hover:bg-card transition-colors min-w-[36px] sm:min-w-0"
                            title="Voir les détails de la demande"
                          >
                            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Voir détails</span>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              Voir les détails
                            </span>
                          </button>
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
          <div className="space-y-6">
            {/* Users table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-card border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Demandes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase">
                        Date d'inscription
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
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-card/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-foreground/60">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-foreground">{user.phone}</p>
                            {user.whatsappPreferred && (
                              <span className="text-accent text-xs">WhatsApp préféré</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/70">
                          {user.requestsCount} demande{user.requestsCount > 1 ? "s" : ""}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/70">
                          {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              user.isBlocked
                                ? "bg-destructive/20 text-destructive"
                                : "bg-success/20 text-success"
                            }`}
                          >
                            {user.isBlocked ? "Bloqué" : "Actif"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => handleBlockClick(user)}
                              className={`group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg hover:opacity-90 transition-opacity min-w-[36px] sm:min-w-0 ${
                                user.isBlocked
                                  ? "bg-success/20 text-success border border-success/30"
                                  : "bg-warning/20 text-warning border border-warning/30"
                              }`}
                              title={user.isBlocked ? "Débloquer l'utilisateur" : "Bloquer l'utilisateur"}
                            >
                              {user.isBlocked ? (
                                <>
                                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">Débloquer</span>
                                </>
                              ) : (
                                <>
                                  <Ban className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">Bloquer</span>
                                </>
                              )}
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {user.isBlocked ? "Débloquer l'utilisateur" : "Bloquer l'utilisateur"}
                              </span>
                            </button>
                            <button
                              onClick={() => handleDeleteUserClick(user)}
                              className="group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 transition-colors min-w-[36px] sm:min-w-0"
                              title="Supprimer l'utilisateur"
                            >
                              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline">Supprimer</span>
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                Supprimer l'utilisateur
                              </span>
                            </button>
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

        {/* Modal de confirmation de blocage/déblocage */}
        <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {userToAction?.isBlocked ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    Débloquer l'utilisateur
                  </>
                ) : (
                  <>
                    <Ban className="h-5 w-5 text-warning" />
                    Bloquer l'utilisateur
                  </>
                )}
              </DialogTitle>
              <DialogDescription className="pt-2">
                {userToAction?.isBlocked
                  ? `Êtes-vous sûr de vouloir débloquer ${userToAction?.name} ? L'utilisateur pourra à nouveau accéder à la plateforme.`
                  : `Êtes-vous sûr de vouloir bloquer ${userToAction?.name} ? L'utilisateur ne pourra plus accéder à la plateforme.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <button
                onClick={() => setBlockDialogOpen(false)}
                className="w-full sm:w-auto px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleBlockConfirm}
                className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity ${
                  userToAction?.isBlocked
                    ? "bg-success text-success-foreground"
                    : "bg-warning text-warning-foreground"
                }`}
              >
                {userToAction?.isBlocked ? "Débloquer" : "Bloquer"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de confirmation de suppression d'utilisateur */}
        <Dialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Supprimer l'utilisateur
              </DialogTitle>
              <DialogDescription className="pt-2">
                Êtes-vous sûr de vouloir supprimer définitivement {userToAction?.name} ? Cette action est irréversible et toutes les données associées à cet utilisateur seront perdues.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <button
                onClick={() => setDeleteUserDialogOpen(false)}
                className="w-full sm:w-auto px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteUserConfirm}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity"
              >
                Supprimer définitivement
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
