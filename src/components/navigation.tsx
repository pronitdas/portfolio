'use client'

import { motion } from 'framer-motion'
import { User, Github, Mail, Code, Briefcase, Award } from 'lucide-react'

interface NavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
}

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  return (
    <motion.nav 
      className="fixed top-0 right-0 h-screen w-24 flex flex-col items-center justify-center gap-8 bg-black/20 backdrop-blur-sm z-50"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavButton icon={User} section="about" currentSection={currentSection} onNavigate={onNavigate} />
      <NavButton icon={Code} section="skills" currentSection={currentSection} onNavigate={onNavigate} />
      <NavButton icon={Briefcase} section="experience" currentSection={currentSection} onNavigate={onNavigate} />
      <NavButton icon={Github} section="projects" currentSection={currentSection} onNavigate={onNavigate} />
      <NavButton icon={Award} section="achievements" currentSection={currentSection} onNavigate={onNavigate} />
      <NavButton icon={Mail} section="contact" currentSection={currentSection} onNavigate={onNavigate} />
    </motion.nav>
  )
}

function NavButton({ icon: Icon, section, currentSection, onNavigate }: any) {
  return (
    <button
      onClick={() => onNavigate(section)}
      className={`p-4 rounded-full transition-colors ${
        currentSection === section 
          ? 'bg-violet-600 text-white' 
          : 'bg-white/10 text-white/60 hover:bg-white/20'
      }`}
    >
      <Icon size={24} />
    </button>
  )
}

