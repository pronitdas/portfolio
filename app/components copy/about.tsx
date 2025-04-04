
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'

export function About({ position = [2, 0, -2] }) {
  return (
    <group position={position}>
      <Html transform>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-96 bg-black/80 backdrop-blur-lg rounded-lg p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="mb-4">
            Hi there 👋 I'm a Fullstack developer from India 🇮🇳
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>🏢 I'm currently working at OLA.</li>
            <li>💻 I use daily: .js, .html, .css, .ts</li>
            <li>💬 Ping me about javascript, development, python, react, wasm, next, aws, geospatial, cicd</li>
            <li>📫 Reach me: twitter.com/pronitk</li>
            <li>😄 Pronouns: He/Him</li>
            <li>⚡ Fun fact: I'm a die hard Whovian #GERONIMO</li>
          </ul>
        </motion.div>
      </Html>
    </group>
  )
}

