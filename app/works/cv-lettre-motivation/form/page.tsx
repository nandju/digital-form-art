"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Check, Upload, X, Plus, FileText, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

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

function CVFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestType, setRequestType] = useState<"new" | "improve">("new")
  const isUpdateMode = searchParams.get("mode") === "update"

  const isImproveFlow = isUpdateMode || requestType === "improve"
  const totalSteps = isUpdateMode ? 8 : 9

  // Vérifier l'authentification
  const [userEmailRequester, setUserEmailRequester] = useState<string | null>(null);
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated")
    const userEmail = sessionStorage.getItem("userEmail")
    setUserEmailRequester(userEmail);
    if (!isAuthenticated) {
      toast({
        title: "Accès non autorisé",
        description: "Veuillez vous connecter pour créer une demande.",
        variant: "destructive",
      })
      router.push("/login")
      return;
    }
    if (isUpdateMode) {
      const requestId = searchParams.get("requestId");
      if (requestId && userEmail) {
        supabase
          .from("request")
          .select("*")
          .eq("id", requestId).eq("owner_email", userEmail)
          .single()
          .then(({ data, error }) => {
            if (error || !data) {
              toast({
                title: "Demande introuvable",
                description: "Impossible de trouver la demande à mettre à jour.",
                variant: "destructive",
              });
              router.push("/dashboard");
              return;
            }
            
            // Attribuer les datas au formData
            setFormData((prev) => ({
              ...prev,
              firstName: data.first_name || "",
              lastName: data.last_name || "",
              age: data.age || "",
              email: data.email || "",
              phone: data.phone || "",
              maritalStatus: data.marital_status || "",
              photo: null,
              hasDrivingLicense: data.has_driving_license || "",
              drivingLicenseType: data.driving_license_type || "",
              oldCv: null,
              presentation: data.presentation || "",
              objective: data.objective || "",
              field: data.field || "",
              diplomas: data.diplomas || [],
              experiences: data.experiences || [],
              itSkills: data.it_skills || "",
              software: data.software || "",
              languages: data.languages || "",
              technicalSkills: data.technical_skills || "",
              organizationalSkills: data.organizational_skills || "",
              organization: data.organization || false,
              teamwork: data.teamwork || false,
              punctuality: data.punctuality || false,
              rigor: data.rigor || false,
              otherQualities: data.other_qualities || "",
              hobbies: data.hobbies || "",
              sports: data.sports || "",
              cultural: data.cultural || "",
              owner_email: data.owner_email || ""
            }));
          });
      }
    }
  }, [router, toast, isUpdateMode, searchParams]);

  const [formData, setFormData] = useState({
    // Étape 1 - Informations personnelles
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    maritalStatus: "",
    photo: null as File | null,
    hasDrivingLicense: "",
    drivingLicenseType: "",
    oldCv: null as File | null,

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
    owner_email: userEmailRequester || "",  
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

  const handleOldCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, oldCv: e.target.files[0] })
    }
  }

  const nextStep = () => {
    // Validation basique avant de passer à l'étape suivante
    const infoStep = isUpdateMode ? 1 : 2
    const profileStep = infoStep + 1
    const diplomasStep = profileStep + 1
    const experiencesStep = diplomasStep + 1

    // Étape type de demande (options)
    if (!isUpdateMode && currentStep === 1) {
      if (!requestType) {
        toast({
          title: "Choix requis",
          description: "Veuillez choisir le type de demande (nouvelle demande ou amélioration).",
          variant: "destructive",
        })
        return
      }
      if (isImproveFlow && !formData.oldCv) {
        toast({
          title: "Ancien CV requis",
          description: "Pour améliorer un CV existant, veuillez téléverser votre ancien CV.",
          variant: "destructive",
        })
        return
      }
    }

    // Étape informations personnelles
    if (currentStep === infoStep && !isImproveFlow) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast({
          title: "Champs requis manquants",
          description: "Veuillez remplir tous les champs obligatoires de cette étape.",
          variant: "destructive",
        })
        return
      }
    }

    // Étape profil professionnel
    if (currentStep === profileStep && !isImproveFlow) {
      if (!formData.presentation || !formData.objective || !formData.field) {
        toast({
          title: "Champs requis manquants",
          description: "Veuillez remplir tous les champs obligatoires de cette étape.",
          variant: "destructive",
        })
        return
      }
    }

    // Étape diplômes
    if (currentStep === diplomasStep && !isImproveFlow) {
      const hasInvalidDiploma =
        formData.diplomas.length > 0 &&
        formData.diplomas.some((d) => !d.diploma || !d.year || !d.institution)

      if (hasInvalidDiploma) {
        toast({
          title: "Diplômes incomplets",
          description: "Veuillez renseigner l'intitulé, l'année et l'établissement pour chaque diplôme ajouté.",
          variant: "destructive",
        })
        return
      }
    }

    // Étape expériences
    if (currentStep === experiencesStep && !isImproveFlow) {
      const hasInvalidExperience =
        formData.experiences.length > 0 &&
        formData.experiences.some(
          (e) =>
            !e.position ||
            !e.company ||
            !e.startMonth ||
            !e.startYear ||
            (!e.current && (!e.endMonth || !e.endYear)),
        )

      if (hasInvalidExperience) {
        toast({
          title: "Expériences incomplètes",
          description:
            "Veuillez compléter les dates de début et de fin pour chaque expérience (ou cochez « Poste actuel » le cas échéant).",
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
      if (!isImproveFlow) {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          toast({
            title: "Erreur de validation",
            description: "Veuillez compléter toutes les informations personnelles.",
            variant: "destructive",
          })
          setCurrentStep(isUpdateMode ? 1 : 2)
          setIsSubmitting(false)
          return
        }
      }
      if (isImproveFlow && !formData.oldCv && !isUpdateMode) {
        toast({
          title: "Ancien CV requis",
          description:
            "Pour améliorer un CV déjà existant, vous devez téléverser votre ancien CV afin que nous puissions nous baser dessus.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Upload des fichiers dans Supabase Storage
      let photoUrl = null;
      let oldCvUrl = null;
      if (formData.photo && formData.photo instanceof File) {
        const { data, error } = await supabase.storage
          .from("documents")
          .upload(`photos/${Date.now()}_${formData.photo.name}`, formData.photo);
        if (error) {
          toast({
            title: "Erreur lors de l'upload de la photo",
            description: error.message,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        photoUrl = supabase.storage.from("documents").getPublicUrl(data.path).data.publicUrl;
      }
      if (formData.oldCv && formData.oldCv instanceof File) {
        const { data, error } = await supabase.storage
          .from("documents")
          .upload(`oldcv/${Date.now()}_${formData.oldCv.name}`, formData.oldCv);
        if (error) {
          toast({
            title: "Erreur lors de l'upload du CV",
            description: error.message,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        oldCvUrl = supabase.storage.from("documents").getPublicUrl(data.path).data.publicUrl;
      }

      // Préparation des données à enregistrer
      const requestPayload = {
        owner_email: userEmailRequester,
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: formData.age,
        email: formData.email,
        phone: formData.phone,
        marital_status: formData.maritalStatus,
        photo: formData.photo ? photoUrl : null,
        has_driving_license: formData.hasDrivingLicense,
        driving_license_type: formData.drivingLicenseType,
        old_cv: formData.oldCv ? oldCvUrl : null,
        presentation: formData.presentation,
        objective: formData.objective,
        field: formData.field,
        diplomas: formData.diplomas,
        experiences: formData.experiences,
        it_skills: formData.itSkills,
        software: formData.software,
        languages: formData.languages,
        technical_skills: formData.technicalSkills,
        organizational_skills: formData.organizationalSkills,
        organization: formData.organization,
        teamwork: formData.teamwork,
        punctuality: formData.punctuality,
        rigor: formData.rigor,
        other_qualities: formData.otherQualities,
        hobbies: formData.hobbies,
        sports: formData.sports,
        cultural: formData.cultural,
        request_type: requestType,
        created_at: new Date().toISOString()
      };

      if (isUpdateMode) {
        // Update la demande existante
        const requestId = searchParams.get("requestId");
        if (!requestId) {
          toast({
            title: "Erreur lors de la mise à jour",
            description: "Identifiant de la demande manquant.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        // Supprime created_at pour ne pas l'écraser
        const { created_at, ...updatePayload } = requestPayload;
        const { error } = await supabase
          .from("request")
          .update(updatePayload)
          .eq("id", requestId)
          .eq("owner_email", userEmailRequester);
        if (error) {
          toast({
            title: "Erreur lors de la mise à jour",
            description: error.message,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        toast({
          title: "Demande mise à jour avec succès !",
          description: "Votre demande a été modifiée.",
          variant: "default",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        // Création nouvelle demande
        const { error } = await supabase.from("request").insert([requestPayload]);
        if (error) {
          throw error;
        }
        sessionStorage.setItem("newRequestCreated", "true");
        toast({
          title: "Demande soumise avec succès !",
          description: "Votre demande de CV & Lettre de motivation a été enregistrée. Vous serez notifié dès qu'elle sera traitée.",
          variant: "default",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error) {
      toast({
        title: "Erreur lors de la soumission",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  const renderStep = () => {
    // Mode mise à jour depuis l'espace client (on ne repasse pas par le choix du type)
    if (isUpdateMode) {
      switch (currentStep) {
        case 1:
          return renderPersonalInfo()
        case 2:
          return renderProfessionalProfile()
        case 3:
          return renderDiplomas()
        case 4:
          return renderExperiences()
        case 5:
          return renderSkills()
        case 6:
          return renderAptitudes()
        case 7:
          return renderInterests()
        case 8:
          return renderSummary()
        default:
          return null
      }
    }

    // Parcours normal avec 9 étapes (1 = choix du type)
    switch (currentStep) {
      case 1:
        return renderRequestType()
      case 2:
        return renderPersonalInfo()
      case 3:
        return renderProfessionalProfile()
      case 4:
        return renderDiplomas()
      case 5:
        return renderExperiences()
      case 6:
        return renderSkills()
      case 7:
        return renderAptitudes()
      case 8:
        return renderInterests()
      case 9:
        return renderSummary()
      default:
        return null
    }
  }

  const renderRequestType = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choix du type de demande</h2>
        <p className="text-sm text-foreground/60 mb-4">
          Sélectionnez ci-dessous si vous souhaitez créer un nouveau CV ou améliorer un CV que vous avez déjà.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setRequestType("new")}
            className={`flex flex-col items-start gap-2 rounded-2xl border px-4 py-4 text-left transition-all ${
              requestType === "new"
                ? "border-accent bg-accent/10 shadow-md"
                : "border-border bg-card hover:bg-card/80"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <FileText className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-semibold text-foreground">Nouvelle demande de CV</span>
            </div>
            <p className="text-xs text-foreground/60">
              Vous partez de zéro ou n&apos;avez pas de CV structuré. Nous créons un CV complet à partir de vos
              réponses.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRequestType("improve")}
            className={`flex flex-col items-start gap-2 rounded-2xl border px-4 py-4 text-left transition-all ${
              requestType === "improve"
                ? "border-accent bg-accent/10 shadow-md"
                : "border-border bg-card hover:bg-card/80"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <Wand2 className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Améliorer un CV que j&apos;ai déjà
              </span>
            </div>
            <p className="text-xs text-foreground/60">
              Téléversez votre ancien CV (obligatoire) pour nous aider à mieux comprendre votre parcours et
              l&apos;optimiser.
            </p>
          </button>
        </div>

        {isImproveFlow && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Ancien CV (obligatoire pour une demande d&apos;amélioration)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.odt,.rtf"
                onChange={handleOldCvChange}
                className="hidden"
                id="old-cv-upload"
              />
              <label htmlFor="old-cv-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-6 w-6 text-foreground/40" />
                <span className="text-xs text-foreground/60">
                  {formData.oldCv ? formData.oldCv.name : "Cliquez pour téléverser votre ancien CV"}
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderPersonalInfo = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Informations personnelles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Prénom{!isImproveFlow ? " *" : ""}
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nom{!isImproveFlow ? " *" : ""}
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Âge{!isImproveFlow ? " *" : ""}
            </label>
            <input
              type="number"
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
          <label className="block text-sm font-medium text-foreground mb-2">
            Email{!isImproveFlow ? " *" : ""}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Téléphone{!isImproveFlow ? " *" : ""}
          </label>
          <input
            type="tel"
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
            <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-foreground/40" />
              <span className="text-sm text-foreground/60">
                {formData.photo ? formData.photo.name : "Cliquez pour téléverser une photo professionnelle"}
              </span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Possédez-vous un permis de conduire ?{!isImproveFlow ? " *" : ""}
            </label>
            <select
              value={formData.hasDrivingLicense}
              onChange={(e) => setFormData({ ...formData, hasDrivingLicense: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Sélectionner</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
          {formData.hasDrivingLicense === "Oui" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Type de permis (ex: B, C, D) *
              </label>
              <input
                type="text"
                value={formData.drivingLicenseType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    drivingLicenseType: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Permis B"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderProfessionalProfile = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Profil professionnel</h2>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Brève présentation personnelle{!isImproveFlow ? " *" : ""}
          </label>
          <textarea
            rows={4}
            value={formData.presentation}
            onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Parlez-nous de vous en quelques lignes..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Objectif professionnel{!isImproveFlow ? " *" : ""}
          </label>
          <textarea
            rows={3}
            value={formData.objective}
            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Quel est votre objectif professionnel ?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Domaine d'étude ou métier visé{!isImproveFlow ? " *" : ""}
          </label>
          <input
            type="text"
            value={formData.field}
            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Ex: Développeur web, Comptable, Étudiant en marketing..."
          />
        </div>
      </div>
    )
  }

  const renderDiplomas = () => {
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
                  value={diploma.diploma}
                  onChange={(e) => updateDiploma(diploma.id, "diploma", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Ex: Baccalauréat, Licence, Master..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Année *</label>
                  <input
                    type="text"
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
  }

  const renderExperiences = () => {
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Poste occupé *</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Entreprise *</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mois début *</label>
                  <input
                    type="text"
                    value={exp.startMonth}
                    onChange={(e) => updateExperience(exp.id, "startMonth", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Année début *</label>
                  <input
                    type="text"
                    value={exp.startYear}
                    onChange={(e) => updateExperience(exp.id, "startYear", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mois fin *</label>
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
                  <label className="block text-sm font-medium text-foreground mb-2">Année fin *</label>
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
  }

  const renderSkills = () => {
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
            Langages de programmation (facultatif)
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
  }

  const renderAptitudes = () => {
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
  }

  const renderInterests = () => {
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
  }

  const renderSummary = () => {
    const infoStep = isUpdateMode ? 1 : 2
    const profileStep = infoStep + 1
    const diplomasStep = profileStep + 1
    const experiencesStep = diplomasStep + 1
    const skillsStep = experiencesStep + 1
    const aptitudesStep = skillsStep + 1
    const interestsStep = aptitudesStep + 1

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Récapitulatif</h2>

        <div className="space-y-6 max-h-[600px] overflow-y-auto">
          {/* Informations personnelles */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Informations personnelles</h3>
              <button
                type="button"
                onClick={() => setCurrentStep(infoStep)}
                className="text-xs text-accent hover:text-link-hover"
              >
                Modifier
              </button>
            </div>
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
              {formData.hasDrivingLicense && (
                <p>
                  <strong>Permis:</strong> {formData.hasDrivingLicense}
                  {formData.hasDrivingLicense === "Oui" && formData.drivingLicenseType
                    ? ` (type ${formData.drivingLicenseType})`
                    : ""}
                </p>
              )}
              {formData.maritalStatus && (
                <p>
                  <strong>Situation:</strong> {formData.maritalStatus}
                </p>
              )}
            </div>
          </div>

          {/* Profil professionnel */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Profil professionnel</h3>
              <button
                type="button"
                onClick={() => setCurrentStep(profileStep)}
                className="text-xs text-accent hover:text-link-hover"
              >
                Modifier
              </button>
            </div>
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Diplômes ({formData.diplomas.length})</h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(diplomasStep)}
                  className="text-xs text-accent hover:text-link-hover"
                >
                  Modifier
                </button>
              </div>
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">
                  Expériences ({formData.experiences.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(experiencesStep)}
                  className="text-xs text-accent hover:text-link-hover"
                >
                  Modifier
                </button>
              </div>
              {formData.experiences.map((e, idx) => (
                <div key={e.id} className="mb-2 text-sm text-foreground/70">
                  <p>
                    {idx + 1}. {e.position} chez {e.company}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Compétences */}
          {(formData.itSkills ||
            formData.software ||
            formData.languages ||
            formData.technicalSkills ||
            formData.organizationalSkills) && (
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Compétences</h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(skillsStep)}
                  className="text-xs text-accent hover:text-link-hover"
                >
                  Modifier
                </button>
              </div>
              <div className="space-y-2 text-sm text-foreground/70">
                {formData.itSkills && (
                  <p>
                    <strong>Informatique:</strong> {formData.itSkills}
                  </p>
                )}
                {formData.software && (
                  <p>
                    <strong>Logiciels:</strong> {formData.software}
                  </p>
                )}
                {formData.languages && (
                  <p>
                    <strong>Langages de programmation:</strong> {formData.languages}
                  </p>
                )}
                {formData.technicalSkills && (
                  <p>
                    <strong>Techniques:</strong> {formData.technicalSkills}
                  </p>
                )}
                {formData.organizationalSkills && (
                  <p>
                    <strong>Organisationnelles / relationnelles:</strong> {formData.organizationalSkills}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Aptitudes & qualités */}
          {(formData.organization ||
            formData.teamwork ||
            formData.punctuality ||
            formData.rigor ||
            formData.otherQualities) && (
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Aptitudes & qualités</h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(aptitudesStep)}
                  className="text-xs text-accent hover:text-link-hover"
                >
                  Modifier
                </button>
              </div>
              <div className="space-y-2 text-sm text-foreground/70">
                {formData.organization && <p>Sens de l&apos;organisation</p>}
                {formData.teamwork && <p>Esprit d&apos;équipe</p>}
                {formData.punctuality && <p>Ponctualité</p>}
                {formData.rigor && <p>Rigueur</p>}
                {formData.otherQualities && (
                  <p>
                    <strong>Autres:</strong> {formData.otherQualities}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Centres d'intérêt */}
          {(formData.hobbies || formData.sports || formData.cultural) && (
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Centres d&apos;intérêt</h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(interestsStep)}
                  className="text-xs text-accent hover:text-link-hover"
                >
                  Modifier
                </button>
              </div>
              <div className="space-y-2 text-sm text-foreground/70">
                {formData.hobbies && (
                  <p>
                    <strong>Loisirs:</strong> {formData.hobbies}
                  </p>
                )}
                {formData.sports && (
                  <p>
                    <strong>Sports:</strong> {formData.sports}
                  </p>
                )}
                {formData.cultural && (
                  <p>
                    <strong>Intérêts culturels / personnels:</strong> {formData.cultural}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Paramètres de la demande */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Paramètres de la demande</h3>
            <div className="space-y-2 text-sm text-foreground/70">
              <p>
                <strong>Type de demande:</strong>{" "}
                {isImproveFlow ? "Amélioration d'un CV existant" : "Création d'un nouveau CV"}
              </p>
              {formData.oldCv && (
                <p>
                  <strong>Ancien CV:</strong> {formData.oldCv.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <p className="text-sm text-foreground/70">
            <strong>Note:</strong> Vérifiez toutes les informations avant de soumettre. En cas d&apos;erreur,
            utilisez les boutons « Modifier » de chaque section ou le bouton « Précédent » pour revenir à
            l&apos;étape concernée et corriger vos données sans les perdre. Vous pourrez également modifier votre
            demande ultérieurement depuis votre espace personnel.
          </p>
        </div>
      </div>
    )
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
        {/* En-tête simple, les options sont maintenant dans l'étape 1 du formulaire */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {isUpdateMode ? "Mettre à jour ma demande de CV" : "Création ou amélioration de votre CV"}
          </h1>
          {isUpdateMode && (
            <p className="text-sm text-foreground/60 mb-4">
              Vous modifiez une demande déjà créée depuis votre espace client. Mettez à jour vos informations, puis
              vérifiez le récapitulatif avant de soumettre à nouveau.
            </p>
          )}
        </div>

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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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

export default function CVFormPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-foreground/60">Chargement du formulaire...</p>
          </div>
        </div>
      }
    >
      <CVFormContent />
    </Suspense>
  )
}
