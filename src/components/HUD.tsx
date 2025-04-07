import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'

interface JobData {
  company: string
  position: string
  period: string
  projects: Array<{
    name: string
    description: string
    technologies: string[]
  }>
  languages: string[]
  achievements: string[]
}

interface HUDProps {
  selectedObject: JobData | null
}

export function HUD({ selectedObject }: HUDProps): React.ReactElement | null {
  return (
    <AnimatePresence>
      {selectedObject && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed left-8 top-1/2 -translate-y-1/2 w-96 bg-black bg-opacity-80 text-white p-6 rounded-lg border border-electric-blue z-50"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <h2 className="text-2xl font-bold text-electric-blue mb-2">
            {selectedObject.company}
          </h2>
          <h3 className="text-xl mb-1">{selectedObject.position}</h3>
          <p className="text-sm text-gray-400 mb-4">{selectedObject.period}</p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-electric-blue mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedObject.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-1 bg-electric-blue bg-opacity-20 rounded-md text-xs"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-electric-blue mb-2">Key Projects</h4>
            {selectedObject.projects.map((project) => (
              <div key={project.name} className="mb-3">
                <h5 className="text-sm font-medium mb-1">{project.name}</h5>
                <p className="text-xs text-gray-400">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 bg-white bg-opacity-10 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-electric-blue mb-2">Achievements</h4>
            <ul className="list-disc list-inside text-sm">
              {selectedObject.achievements.map((achievement) => (
                <li key={achievement} className="text-gray-300 mb-1">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 