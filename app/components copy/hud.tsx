
import { motion, AnimatePresence } from 'framer-motion'

export function HUD({ selectedObject }) {
  console.log('HUD - selectedObject:', selectedObject)

  if (!selectedObject) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute top-4 left-4 text-cyan-400">
        <h1 className="text-2xl font-bold">Pronit Das: Cosmic Portfolio</h1>
        <p>Navigate the cosmic system to explore my professional journey</p>
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-4 left-4 bg-black/80 text-cyan-400 p-4 rounded-lg pointer-events-auto max-w-md"
        >
          <h2 className="text-xl font-bold">{selectedObject.company}</h2>
          <p>{selectedObject.position} | {selectedObject.period}</p>
          {selectedObject.selectedProject ? (
            <>
              <h3 className="mt-2 font-bold">{selectedObject.selectedProject.name}</h3>
              <p>{selectedObject.selectedProject.description}</p>
              <div className="mt-2">
                <h4 className="font-bold">Technologies:</h4>
                <ul className="list-disc list-inside">
                  {selectedObject.selectedProject.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="mt-2">
                <h3 className="font-bold">Tech Stack:</h3>
                <ul className="list-disc list-inside">
                  {selectedObject.languages.map((lang, index) => (
                    <li key={index}>{lang}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-bold">Achievements:</h3>
                <ul className="list-disc list-inside">
                  {selectedObject.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

