import React from 'react'
import { Hero } from '../components/Landing/Hero'
import { AboutSection } from '../components/Landing/AboutUs'
import { Features } from '../components/Landing/Features'
import { Services } from '../components/Landing/Service'
import { FAQ } from '../components/Landing/FAQ'
import { CTASection } from '../components/Landing/CTASection'

const HomePage = () => {
  return (
    <div>
     <Hero />
     <AboutSection />
     <Features />
     <Services />
     <FAQ />
     <CTASection />

    </div>
  )
}

export default HomePage