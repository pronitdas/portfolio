'use client'

import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'

const skills = [
  { name: 'JavaScript', level: 95 },
  { name: 'Python', level: 90 },
  { name: 'React', level: 92 },
  { name: 'Node.js', level: 88 },
  { name: 'TypeScript', level: 85 },
  { name: 'AWS', level: 80 },
  { name: 'Three.js', level: 75 },
  { name: 'Geospatial', level: 85 },
]

export function Skills({ position = [-2, 0, -2] }) {
  return (
    <group position={position}>
      <Html transform>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-96 bg-black/80 backdrop-blur-lg rounded-lg p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-violet-400">{skill.name}</span>
                  <span className="text-sm font-medium text-violet-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Html>
    </group>
  )
}

