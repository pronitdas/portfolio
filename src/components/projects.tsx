'use client'

import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'maps.tardis.digital',
    description: 'Geo dashboard for all kind',
    tech: 'TypeScript',
    link: 'https://github.com/tardis-pro/maps.tardis.digital'
  },
  {
    title: 'simple_erp_frontend',
    description: 'Modern ERP Solution',
    tech: 'JavaScript',
    link: 'https://github.com/tardis-pro/simple_erp_frontend'
  },
  {
    title: 'tardis-portfolio',
    description: 'Personal portfolio website',
    tech: 'CSS',
    link: 'https://github.com/tardis-pro/tardis-portfolio'
  },
  {
    title: 'Geographical-Adventures',
    description: 'Geographical data visualization',
    tech: 'C#',
    link: 'https://github.com/tardis-pro/Geographical-Adventures'
  },
]

export function Projects({ position = [-2, 0, -2] }) {
  return (
    <group position={position}>
      <Html transform>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-96 bg-black/80 backdrop-blur-lg rounded-lg p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors"
              >
                <h3 className="font-bold text-violet-400">{project.title}</h3>
                <p className="text-sm text-white/60">{project.description}</p>
                <span className="text-xs text-violet-300">{project.tech}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </Html>
    </group>
  )
}

