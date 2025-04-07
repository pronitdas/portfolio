'use client'

import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'

const experiences = [
  {
    company: 'Ola',
    position: 'SDE 3',
    period: 'Aug 2023 - Present',
    description: 'Working on cutting-edge mobility solutions.'
  },
  {
    company: 'Tardis Solutions',
    position: 'Senior Consultant',
    period: 'Apr 2023 - Present',
    description: 'Geospatial and digital transformation projects.'
  },
  {
    company: 'Autodesk',
    position: 'Senior Software Engineer',
    period: 'Jun 2022 - Jun 2023',
    description: 'Developed innovative software solutions.'
  },
  {
    company: 'Velotio Technologies',
    position: 'Senior Software Engineer',
    period: 'Jun 2021 - Apr 2022',
    description: 'Built scalable backend services.'
  },
]

export function WorkExperience({ position = [2, 0, -2] }) {
  return (
    <group position={position}>
      <Html transform>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-96 bg-black/80 backdrop-blur-lg rounded-lg p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold text-violet-400">{exp.company}</h3>
                <p className="text-sm text-white/60">{exp.position}</p>
                <p className="text-xs text-violet-300">{exp.period}</p>
                <p className="mt-2 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Html>
    </group>
  )
}

