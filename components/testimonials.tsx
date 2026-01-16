import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    title: "CV et lettre de motivation exceptionnels !",
    quote:
      "Grâce à DIGITAL Form Art, j'ai obtenu un CV et une lettre de motivation parfaitement structurés qui mettent en valeur mon parcours. J'ai reçu plusieurs entretiens dans les semaines qui ont suivi.",
    author: "Aminata Kouassi",
    location: "Abidjan, Côte d'Ivoire",
    image: "/images/imgi_108_user88.webp",
  },
  {
    title: "Accompagnement personnalisé remarquable !",
    quote:
      "L'équipe de DIGITAL Form Art m'a accompagné avec professionnalisme dans ma recherche d'emploi. Leur suivi personnalisé et leurs conseils m'ont permis de décrocher le poste de mes rêves.",
    author: "Kouamé Traoré",
    location: "Yamoussoukro, Côte d'Ivoire",
    image: "/images/imgi_113_user93.webp",
  },
  {
    title: "Valorisation de profil réussie !",
    quote:
      "Mon profil professionnel a été complètement transformé. Les experts de DIGITAL Form Art ont su mettre en avant mes compétences de manière optimale. Je recommande vivement leurs services.",
    author: "Fatou Diallo",
    location: "Bouaké, Côte d'Ivoire",
    image: "/images/imgi_109_user89.webp",
  },
  {
    title: "Service d'assistance au top !",
    quote:
      "L'accompagnement de DIGITAL Form Art est exceptionnel. Leur équipe est toujours disponible pour répondre à mes questions et m'aider à optimiser mes candidatures. Un service de qualité !",
    author: "Jean-Baptiste Koné",
    location: "San-Pédro, Côte d'Ivoire",
    image: "/images/imgi_107_user87.webp",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-card">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <Quote className="w-5 h-5 text-accent" strokeWidth={2} />
          <span className="text-sm font-medium text-foreground/70">Testimonials</span>
        </div>

        <h2 className="text-3xl font-serif text-foreground mb-12 md:text-5xl">Témoignages</h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">{testimonial.title}</h3>
              <p className="text-foreground/70 mb-8 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
