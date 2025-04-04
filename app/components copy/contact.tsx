
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Contact({ position = [0, 0, -3] }) {
  return (
    <group position={position}>
      <Html transform>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-96 bg-black/80 backdrop-blur-lg rounded-lg p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <div className="flex gap-4 mb-6">
            <a
              href="https://github.com/pronitdas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/pronit78"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://twitter.com/pronitk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>
          <p className="text-white/60">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
        </motion.div>
      </Html>
    </group>
  )
}

