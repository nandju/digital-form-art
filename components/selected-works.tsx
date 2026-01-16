"use client"

import { ArrowUpRight, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const works = [
  {
    title: "CV & Lettre de Motivation",
    description:
      "Conception de CV professionnels et rédaction de lettres de motivation personnalisées. Des documents clairs, modernes et adaptés aux exigences des recruteurs pour valoriser efficacement votre profil.",
    image: "/images/service_2.jpg",
    href: "/works/cv-lettre-motivation",
  },
  {
    title: "Recherche d’Emploi",
    description:
      "Accompagnement dans votre recherche d’emploi grâce à des conseils stratégiques, un suivi personnalisé et une meilleure orientation vers les opportunités adaptées à votre profil.",
    image: "/images/service_1.jpg",
    href: "/works/recherche-emploi",
  },
  {
    title: "Formations à Suivre",
    description:
      "Accédez à des formations professionnelles ciblées pour développer vos compétences, renforcer votre employabilité et évoluer durablement dans votre carrière.",
    image: "/images/service_3.jpg",
    href: "/works/formations",
  },
];


export default function SelectedWorks() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])])
            }
          })
        },
        { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="works" className="py-20 px-6 bg-card">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-accent" strokeWidth={2} />
          <span className="text-sm font-medium text-foreground/70">Nos réalisations</span>
        </div>

        <h2 className="font-serif text-foreground mb-12 text-5xl">Nos Réalisations</h2>

        {/* Works List */}
        <div className="space-y-8">
          {works.map((work, index) => (
            <Link key={index} href={work.href} className="group block border-t border-border pt-8 border-none">
              <div
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                className="flex flex-col lg:flex-row lg:items-start gap-6"
              >
                {/* Title and Description */}
                <div className="lg:w-1/3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors md:text-3xl">
                      {work.title}
                    </h3>
                    <ArrowUpRight className="h-6 w-6 text-foreground/50 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="mt-4 text-foreground/70 text-sm">{work.description}</p>
                </div>

                <div
                  className={`lg:w-2/3 rounded-2xl overflow-hidden transition-all duration-700 ${
                    visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={`${work.title} preview`}
                    width={800}
                    height={500}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
