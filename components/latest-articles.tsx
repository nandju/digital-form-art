import Image from "next/image"
import Link from "next/link"
import { BookOpen } from "lucide-react"

const articles = [
  {
    category: "CV & Candidature",
    date: "5 fév 2025",
    title: "Comment créer un CV qui sort du lot : guide complet pour optimiser votre candidature",
    image: "/images/542b88fc-cb0e-4cb0-8022-6c02e3a5d7b5.png",
    href: "/blog/creer-cv-optimise",
  },
  {
    category: "Carrière",
    date: "5 fév 2025",
    title: "Valoriser son profil professionnel : stratégies pour mettre en avant vos compétences",
    image: "/images/af346a86-aa15-4aa1-bb37-9fb3c2200752.png",
    href: "/blog/valoriser-profil",
  },
  {
    category: "Recherche d'emploi",
    date: "5 fév 2025",
    title: "Optimiser sa recherche d'emploi : conseils pratiques pour accéder aux meilleures opportunités",
    image: "/images/71dcbc2f-6fc0-46fc-90fd-f90f4a94a619.png",
    href: "/blog/optimiser-recherche-emploi",
  },
]

export default function LatestArticles() {
  return (
    <section id="blog" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-accent" strokeWidth={2} />
          <span className="text-sm font-medium text-foreground/70">Nos articles</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-12">Derniers Articles</h2>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link key={index} href={article.href} className="group">
              <div className="rounded-2xl overflow-hidden mb-4">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={250}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-medium text-foreground/60 bg-secondary px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-foreground/50">{article.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors capitalize">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
