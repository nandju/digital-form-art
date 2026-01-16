"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Check, Upload, X, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Diploma {
  id: string
  diploma: string
  year: string
  institution: string
  specialty: string
}

interface Experience {
  id: string
  position: string
  company: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  current: boolean
  tasks: string
}

export default function CVFormPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Vérifier l'authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      toast({
        title: "Accès non autorisé",
        description: "Veuillez vous connecter pour créer une demande.",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [router, toast])

  const [formData, setFormData] = useState({
    // Étape 1 - Informations personnelles
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    maritalStatus: "",
    photo: null as File | null,

    // Étape 2 - Profil professionnel
    presentation: "",
    objective: "",
    field: "",

    // Étape 3 - Diplômes
    diplomas: [] as Diploma[],

    // Étape 4 - Expériences
    experiences: [] as Experience[],

    // Étape 5 - Compétences
    itSkills: "",
    software: "",
    languages: "",
    technicalSkills: "",
    organizationalSkills: "",

    // Étape 6 - Aptitudes
    organization: false,
    teamwork: false,
    punctuality: false,
    rigor: false,
    otherQualities: "",

    // Étape 7 - Centres d'intérêt
    hobbies: "",
    sports: "",
    cultural: "",
  })

  const addDiploma = () => {
    setFormData({
      ...formData,
      diplomas: [
        ...formData.diplomas,
        { id: Date.now().toString(), diploma: "", year: "", institution: "", specialty: "" },
      ],
    })
  }

  const removeDiploma = (id: string) => {
    setFormData({
      ...formData,
      diplomas: formData.diplomas.filter((d) => d.id !== id),
    })
  }

  const updateDiploma = (id: string, field: keyof Diploma, value: string) => {
    setFormData({
      ...formData,
      diplomas: formData.diplomas.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
    })
  }

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        {
          id: Date.now().toString(),
          position: "",
          company: "",
          startMonth: "",
          startYear: "",
          endMonth: "",
          endYear: "",
          current: false,
          tasks: "",
        },
      ],
    })
  }

  const removeExperience = (id: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter((e) => e.id !== id),
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] })
    }
  }

  const nextStep = () => {
    // Validation basique avant de passer à l'étape suivante
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast({
          title: "Champs requis manquants",
          description: "Veuillez remplir tous les champs obligatoires de cette étape.",
          variant: "destructive",
        })
        return
      }
    }
    if (currentStep === 2) {
      if (!formData.presentation || !formData.objective || !formData.field) {
        toast({
          title: "Champs requis manquants",
          description: "Veuillez remplir tous les champs obligatoires de cette étape.",
          variant: "destructive",
        })
        return
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Validation finale
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez compléter toutes les informations personnelles.",
          variant: "destructive",
        })
        setCurrentStep(1)
        setIsSubmitting(false)
        return
      }

      // TODO: Envoyer les données au backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Marquer qu'une nouvelle demande a été créée
      sessionStorage.setItem("newRequestCreated", "true")

      toast({
        title: "Demande soumise avec succès !",
        description: "Votre demande de CV & Lettre de motivation a été enregistrée. Vous serez notifié dès qu'elle sera traitée.",
        variant: "default",
      })

      // Redirection vers le dashboard après un court délai
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      toast({
        title: "Erreur lors de la soumission",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Informations personnelles</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Prénom *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nom *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Âge *</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Situation matrimoniale
                </label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Sélectionner</option>
                  <option value="single">Célibataire</option>
                  <option value="married">Marié(e)</option>
                  <option value="divorced">Divorcé(e)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Téléphone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Photo d'identité professionnelle
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-foreground/40" />
                  <span className="text-sm text-foreground/60">
                    {formData.photo ? formData.photo.name : "Cliquez pour téléverser"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Profil professionnel</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Brève présentation personnelle *
              </label>
              <textarea
                required
                rows={4}
                value={formData.presentation}
                onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Parlez-nous de vous en quelques lignes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Objectif professionnel *
              </label>
              <textarea
                required
                rows={3}
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Quel est votre objectif professionnel ?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Domaine d'étude ou métier visé *
              </label>
              <input
                type="text"
                required
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Développeur web, Comptable, Étudiant en marketing..."
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Diplômes et formations</h2>
              <button
                type="button"
                onClick={addDiploma}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Ajouter un diplôme
              </button>
            </div>

            {formData.diplomas.length === 0 ? (
              <div className="text-center py-8 text-foreground/60">
                <p>Aucun diplôme ajouté. Cliquez sur "Ajouter un diplôme" pour commencer.</p>
              </div>
            ) : (
              formData.diplomas.map((diploma) => (
                <div key={diploma.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">Diplôme {formData.diplomas.indexOf(diploma) + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeDiploma(diploma.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Diplôme obtenu *</label>
                    <input
                      type="text"
                      required
                      value={diploma.diploma}
                      onChange={(e) => updateDiploma(diploma.id, "diploma", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Ex: Baccalauréat, Licence, Master..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Année *</label>
                      <input
                        type="text"
                        required
                        value={diploma.year}
                        onChange={(e) => updateDiploma(diploma.id, "year", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Établissement *</label>
                      <input
                        type="text"
                        required
                        value={diploma.institution}
                        onChange={(e) => updateDiploma(diploma.id, "institution", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Nom de l'école/université"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Spécialité</label>
                    <input
                      type="text"
                      value={diploma.specialty}
                      onChange={(e) => updateDiploma(diploma.id, "specialty", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Ex: Informatique, Marketing, Comptabilité..."
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Expériences professionnelles</h2>
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Ajouter une expérience
              </button>
            </div>

            {formData.experiences.length === 0 ? (
              <div className="text-center py-8 text-foreground/60">
                <p>Aucune expérience ajoutée. Cette section est optionnelle.</p>
                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-4 text-accent hover:text-link-hover"
                >
                  Cliquez ici pour ajouter une expérience
                </button>
              </div>
            ) : (
              formData.experiences.map((exp) => (
                <div key={exp.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">
                      Expérience {formData.experiences.indexOf(exp) + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Poste occupé *</label>
                      <input
                        type="text"
                        required
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Entreprise *</label>
                      <input
                        type="text"
                        required
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Mois début</label>
                      <input
                        type="text"
                        value={exp.startMonth}
                        onChange={(e) => updateExperience(exp.id, "startMonth", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Année début</label>
                      <input
                        type="text"
                        value={exp.startYear}
                        onChange={(e) => updateExperience(exp.id, "startYear", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Mois fin</label>
                      <input
                        type="text"
                        value={exp.endMonth}
                        onChange={(e) => updateExperience(exp.id, "endMonth", e.target.value)}
                        disabled={exp.current}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                        placeholder="12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Année fin</label>
                      <input
                        type="text"
                        value={exp.endYear}
                        onChange={(e) => updateExperience(exp.id, "endYear", e.target.value)}
                        disabled={exp.current}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                        placeholder="2023"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                        className="w-4 h-4 rounded border-border text-accent"
                      />
                      <span className="text-sm text-foreground/70">Poste actuel</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Principales tâches réalisées
                    </label>
                    <textarea
                      rows={3}
                      value={exp.tasks}
                      onChange={(e) => updateExperience(exp.id, "tasks", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Décrivez vos principales responsabilités..."
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Compétences</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Compétences informatiques
              </label>
              <textarea
                rows={3}
                value={formData.itSkills}
                onChange={(e) => setFormData({ ...formData, itSkills: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Maîtrise de Windows, Linux, macOS..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Logiciels maîtrisés</label>
              <textarea
                rows={3}
                value={formData.software}
                onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Microsoft Office, Photoshop, AutoCAD..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Langages de programmation (si applicable)
              </label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: JavaScript, Python, Java..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Compétences techniques
              </label>
              <textarea
                rows={3}
                value={formData.technicalSkills}
                onChange={(e) => setFormData({ ...formData, technicalSkills: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Compétences spécifiques à votre domaine..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Compétences organisationnelles / relationnelles
              </label>
              <textarea
                rows={3}
                value={formData.organizationalSkills}
                onChange={(e) => setFormData({ ...formData, organizationalSkills: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Gestion d'équipe, communication, négociation..."
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Aptitudes & qualités personnelles</h2>

            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-card">
                <input
                  type="checkbox"
                  checked={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.checked })}
                  className="w-5 h-5 rounded border-border text-accent"
                />
                <span className="text-foreground">Sens de l'organisation</span>
              </label>

              <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-card">
                <input
                  type="checkbox"
                  checked={formData.teamwork}
                  onChange={(e) => setFormData({ ...formData, teamwork: e.target.checked })}
                  className="w-5 h-5 rounded border-border text-accent"
                />
                <span className="text-foreground">Esprit d'équipe</span>
              </label>

              <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-card">
                <input
                  type="checkbox"
                  checked={formData.punctuality}
                  onChange={(e) => setFormData({ ...formData, punctuality: e.target.checked })}
                  className="w-5 h-5 rounded border-border text-accent"
                />
                <span className="text-foreground">Ponctualité</span>
              </label>

              <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-card">
                <input
                  type="checkbox"
                  checked={formData.rigor}
                  onChange={(e) => setFormData({ ...formData, rigor: e.target.checked })}
                  className="w-5 h-5 rounded border-border text-accent"
                />
                <span className="text-foreground">Rigueur</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Autres qualités personnelles
              </label>
              <textarea
                rows={3}
                value={formData.otherQualities}
                onChange={(e) => setFormData({ ...formData, otherQualities: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Décrivez d'autres qualités que vous possédez..."
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Centres d'intérêt / Loisirs</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Loisirs</label>
              <textarea
                rows={2}
                value={formData.hobbies}
                onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Lecture, cinéma, musique..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Activités sportives</label>
              <textarea
                rows={2}
                value={formData.sports}
                onChange={(e) => setFormData({ ...formData, sports: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Football, natation, course à pied..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Intérêts culturels ou personnels
              </label>
              <textarea
                rows={2}
                value={formData.cultural}
                onChange={(e) => setFormData({ ...formData, cultural: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Voyages, art, cuisine..."
              />
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Récapitulatif</h2>

            <div className="space-y-6 max-h-[600px] overflow-y-auto">
              {/* Informations personnelles */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Informations personnelles</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  <p>
                    <strong>Nom complet:</strong> {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Âge:</strong> {formData.age}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Téléphone:</strong> {formData.phone}
                  </p>
                  {formData.maritalStatus && (
                    <p>
                      <strong>Situation:</strong> {formData.maritalStatus}
                    </p>
                  )}
                </div>
              </div>

              {/* Profil professionnel */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Profil professionnel</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  <p>
                    <strong>Présentation:</strong> {formData.presentation || "Non renseigné"}
                  </p>
                  <p>
                    <strong>Objectif:</strong> {formData.objective || "Non renseigné"}
                  </p>
                  <p>
                    <strong>Domaine:</strong> {formData.field || "Non renseigné"}
                  </p>
                </div>
              </div>

              {/* Diplômes */}
              {formData.diplomas.length > 0 && (
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">Diplômes ({formData.diplomas.length})</h3>
                  {formData.diplomas.map((d, idx) => (
                    <div key={d.id} className="mb-2 text-sm text-foreground/70">
                      <p>
                        {idx + 1}. {d.diploma} - {d.institution} ({d.year})
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Expériences */}
              {formData.experiences.length > 0 && (
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">
                    Expériences ({formData.experiences.length})
                  </h3>
                  {formData.experiences.map((e, idx) => (
                    <div key={e.id} className="mb-2 text-sm text-foreground/70">
                      <p>
                        {idx + 1}. {e.position} chez {e.company}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-accent/10 border border-accent rounded-lg p-4">
              <p className="text-sm text-foreground/70">
                <strong>Note:</strong> Vérifiez toutes les informations avant de soumettre. Vous pourrez modifier
                votre demande ultérieurement depuis votre espace personnel.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Retour à l'accueil</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm text-foreground/60">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form content */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
          {renderStep()}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                    Soumission en cours...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Soumettre ma demande
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
