import { ArrowUpRight, FileText, Briefcase, GraduationCap, HelpCircle, Settings } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: FileText,
    title: "CV & Lettre de motivation",
    description:
      "Valorisation de votre profil professionnel avec des CV et lettres de motivation optimisés, structurés et adaptés à vos candidatures.",
    href: "/login",
  },
  {
    icon: Briefcase,
    title: "Recherche d'emploi",
    description: "Accès à des opportunités professionnelles et mise en relation avec le marché de l'emploi. Service à venir.",
    href: "/services/recherche-emploi",
  },
  {
    icon: GraduationCap,
    title: "Formations professionnelles",
    description: "Développement de compétences et renforcement de l'employabilité grâce à nos programmes de formation. Service à venir.",
    href: "/services/formations",
  },
  {
    icon: HelpCircle,
    title: "Assistance & Accompagnement",
    description: "Suivi personnalisé, conseils professionnels et support aux utilisateurs pour optimiser votre parcours de carrière.",
    href: "/services/assistance",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-accent" strokeWidth={2} />
              <span className="text-sm font-medium text-foreground/70">Nos services</span>
            </div>

            <h2 className="text-3xl font-serif text-foreground mb-6 md:text-5xl">Nos Services</h2>

            <p className="text-foreground/70 max-w-lg">
              DIGITAL Form Art propose une gamme complète de services d'accompagnement professionnel. 
              De la création de documents de candidature optimisés à l'assistance personnalisée, nous vous accompagnons 
              à chaque étape de votre parcours professionnel.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Voir tous les services
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right Content - Services Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group p-6 border border-border hover:border-foreground/30 transition-colors rounded-none border-t-0 border-l-[0] border-r-0"
              >
                <service.icon className="h-8 w-8 text-foreground mb-4" strokeWidth={1} />
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-foreground/60">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
