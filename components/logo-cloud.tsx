export default function LogoCloud() {
  const logos = ["Partenaires", "Entreprises", "Recruteurs", "Institutions", "Formations", "Carrières", "Talents"]

  return (
    <section className="py-12 px-6 border-y border-border bg-accent border-none">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((logo) => (
            <div key={logo} className="font-medium text-lg hover:text-foreground/60 transition-colors text-white">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
