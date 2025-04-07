'use client'

import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'

const achievements = [
  { name: 'MultiLanguage User', description: 'Proficient in multiple programming languages' },
  { name: 'Open Source Contributor', description: 'Active contributor to open-source projects' },
  { name: 'Tech Speaker', description: 'Presented at tech conferences and meetups' },
  { name: 'Hackathon Winner', description: 'Won multiple hackathons' },
  { name: 'Patent Holder', description: 'Holds patents in software technology' },
]

export function Achievements({ position = [0, 0, -3] }) {
  return (
    <group position={position}>
      <Html transform>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-96 bg-black/80 backdrop-blur-lg rounded-lg p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold text-violet-400">{achievement.name}</h3>
                <p className="text-sm text-white/60">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Html>
    </group>
  )
}

