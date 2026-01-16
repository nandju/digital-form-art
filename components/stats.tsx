import { ArrowUpRight, BarChart3 } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    label: "CV et lettres de motivation créés",
    value: "500+",
  },
  {
    label: "Taux de satisfaction client",
    value: "98%",
  },
  {
    label: "Candidats accompagnés",
    value: "1200+",
  },
  {
    label: "Taux de réussite aux entretiens",
    value: "75%",
  },
  {
    label: "Amélioration de l'employabilité",
    value: "3x",
  },
]

export default function Stats() {
  return (
    <section className="py-20 px-4 sm:px-6 text-background bg-accent overflow-x-hidden">
      <div className="mx-auto max-w-7xl w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-background" strokeWidth={2} />
              <span className="text-sm font-medium text-background/70">Nos résultats</span>
            </div>

            <p className="text-background/70 max-w-md">
              Chez DIGITAL Form Art, nous mesurons notre succès par la réussite professionnelle de nos clients et leur satisfaction.
            </p>

            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-accent hover:bg-white/90 transition-all"
            >
              En savoir plus
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-0">
          {/* First Stat */}
          <div className="flex flex-col">
            <div className="bg-background/10 p-4 sm:p-6 md:p-8 rounded-none flex-1 flex flex-col justify-center border border-white overflow-hidden">
              <p className="text-xs sm:text-sm text-background/60 mb-2 break-words">{stats[0].label}</p>
              <p className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-background leading-none">{stats[0].value}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-background/10 p-4 sm:p-6 md:p-8 rounded-none flex-1 flex flex-col justify-center border border-white overflow-hidden">
              <p className="text-xs sm:text-sm text-background/60 mb-2 break-words">{stats[3].label}</p>
              <p className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-background leading-none">{stats[3].value}</p>
            </div>
            <div className="bg-background/10 p-4 sm:p-6 md:p-8 rounded-none flex-1 flex flex-col justify-center gap-0 border border-white overflow-hidden">
              <p className="text-xs sm:text-sm text-background/60 mb-2 break-words">{stats[4].label}</p>
              <p className="font-serif text-background text-4xl sm:text-6xl md:text-7xl lg:text-9xl leading-none">{stats[4].value}</p>
            </div>
          </div>

          {/* Other Stats */}
          <div className="flex flex-col">
            <div className="bg-background/10 p-4 sm:p-6 md:p-8 rounded-none flex-1 flex flex-col justify-center border border-white overflow-hidden">
              <p className="text-xs sm:text-sm text-background/60 mb-2 break-words">{stats[1].label}</p>
              <p className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-background leading-none">{stats[1].value}</p>
            </div>
            <div className="bg-background/10 p-4 sm:p-6 md:p-8 rounded-none flex-1 flex flex-col justify-center gap-0 border border-white overflow-hidden">
              <p className="text-xs sm:text-sm text-background/60 mb-2 break-words">{stats[2].label}</p>
              <p className="font-serif text-background text-4xl sm:text-6xl md:text-7xl lg:text-9xl leading-none">{stats[2].value}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
