import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import LogoCloud from "@/components/logo-cloud"
import SelectedWorks from "@/components/selected-works"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import ContactSection from "@/components/contact-section"
import Stats from "@/components/stats"
import LatestArticles from "@/components/latest-articles"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <LogoCloud />
      <SelectedWorks />
      <Services />
      <Testimonials />
      <ContactSection />
      <Stats />
      <LatestArticles />
      <Footer />
    </main>
  )
}
