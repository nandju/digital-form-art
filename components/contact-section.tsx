"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpRight, Send } from "lucide-react"
import Image from "next/image"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <Send className="w-5 h-5 text-accent" strokeWidth={2} />
          <span className="text-sm font-medium text-foreground/70">Contactez-nous</span>
        </div>

        <p className="text-foreground/70 max-w-xl mb-12">
          Prêt à valoriser votre parcours professionnel ? Que vous ayez besoin d'un CV optimisé, d'une lettre de motivation 
          personnalisée ou d'un accompagnement complet, notre équipe d'experts est là pour vous aider à atteindre vos objectifs de carrière.
        </p>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="overflow-hidden">
            <Image
              src="/images/service_4.jpg"
              alt="DIGITAL Form Art - Contact"
              width={600}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="bg-card p-8 border-border rounded-none border-0">
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-2">Besoin d'accompagnement ?</h3>
            <p className="text-foreground/70 mb-8">
              Discutons de votre projet professionnel et découvrons comment nous pouvons vous aider à valoriser votre parcours et accéder aux meilleures opportunités.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Prénom*"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    placeholder="Adresse email*"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                  />
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Écrivez votre message ici *"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
              >
                Envoyer
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
