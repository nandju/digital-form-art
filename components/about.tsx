import { ArrowUpRight, Cpu, Info } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <section id="about" className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-accent" strokeWidth={2} />
              <span className="text-sm font-medium text-foreground/70">À propos</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight text-balance">
              DIGITAL Form Art : votre partenaire pour construire et valoriser votre parcours professionnel.
            </h2>

            <p className="mt-6 text-foreground/70">
              Nous accompagnons les talents dans la construction, l'amélioration et la valorisation de leur parcours de carrière. 
              De la création de CV et lettres de motivation optimisées à l'accompagnement personnalisé, nous vous aidons à 
              mettre en avant vos compétences et à accéder aux meilleures opportunités professionnelles.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group"
            >
              En savoir plus
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right Content - Technology Card */}
          <div className="bg-card rounded-3xl p-8 border border-border">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6">
              <Cpu className="h-6 w-6 text-accent-foreground" />
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-4">Accompagnement Personnalisé</h3>

            <p className="text-foreground/70">
              Chez DIGITAL Form Art, nous offrons un suivi personnalisé et des conseils professionnels adaptés à votre profil. 
              Notre mission est de renforcer votre employabilité et de vous guider vers le succès professionnel.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
