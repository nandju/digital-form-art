"use client"
import { useState, useEffect } from 'react'

export default function NotFound() {
  const [timeLeft, setTimeLeft] = useState({
    days: 348,
    hours: 8,
    minutes: 4,
    seconds: 49
  })

  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) {
              hours = 23
              days--
            }
          }
        }
        
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const formatNumber = (num: number) => String(num).padStart(2, '0')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary/20 to-white flex flex-col items-center justify-center px-4 py-16">
      {/* Main Content */}
      <div className="text-center max-w-2xl w-full">
        {/* 404 Heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-8 tracking-tight">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          OUPS, PAGE INTROUVABLE
        </h2>

        {/* Description */}
        <p className="text-foreground/60 text-lg mb-12">
          Désolé, la page que vous recherchez n'existe pas.<br />
          Mais ne vous inquiétez pas, quelque chose d'extraordinaire arrive très bientôt !
        </p>

        {/* Coming Soon Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-6">
            LANCEMENT IMMINENT
          </h3>

          {/* Countdown */}
          <div className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 border-2 border-primary/20 rounded-lg px-4 md:px-8 py-6 mb-3 min-w-fit">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {formatNumber(timeLeft.days)}
                </span>
              </div>
              <span className="text-sm text-foreground/50 font-medium">Jours</span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 border-2 border-primary/20 rounded-lg px-4 md:px-8 py-6 mb-3 min-w-fit">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {formatNumber(timeLeft.hours)}
                </span>
              </div>
              <span className="text-sm text-foreground/50 font-medium">Heures</span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 border-2 border-primary/20 rounded-lg px-4 md:px-8 py-6 mb-3 min-w-fit">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {formatNumber(timeLeft.minutes)}
                </span>
              </div>
              <span className="text-sm text-foreground/50 font-medium">Minutes</span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 border-2 border-primary/20 rounded-lg px-4 md:px-8 py-6 mb-3 min-w-fit">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {formatNumber(timeLeft.seconds)}
                </span>
              </div>
              <span className="text-sm text-foreground/50 font-medium">Secondes</span>
            </div>
          </div>
        </div>

        {/* Get Notified Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-primary mb-3">
            RECEVEZ LES ACTUALITÉS
          </h3>
          <p className="text-foreground/60 text-base mb-8">
            Nous vous informerons dès que nous serons en ligne.<br />
            Nous pourrions même vous envoyer une invitation exclusive en avant-première.
          </p>

          {/* Email Input */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubscribe(e)}
              placeholder="Entrez votre email"
              className="px-6 py-3 rounded-lg border-2 border-primary/20 bg-white text-primary placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors w-full sm:w-auto"
            />
            <button
              onClick={handleSubscribe}
              className="px-8 py-3 rounded-lg bg-accent hover:opacity-90 text-white font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              S'abonner
            </button>
          </div>

          {/* Success Message */}
          {subscribed && (
            <div className="text-accent font-medium animate-fade-in">
              ✓ Merci ! Nous vous contacterons bientôt.
            </div>
          )}
        </div>

        {/* Back to Home */}
        <a
          href="/"
          className="inline-block px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
        >
          Retour à l'accueil
        </a>
      </div>

      {/* Footer Note */}
      <div className="mt-20 text-center text-foreground/40 text-sm max-w-xl">
        <p>
          Cette page indique que quelque chose d'extraordinaire se prépare. En attendant,{' '}
          <a href="/" className="text-accent hover:underline">
            explorez notre site principal
          </a>
          .
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}