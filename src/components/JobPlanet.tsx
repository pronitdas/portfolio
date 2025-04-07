import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Html } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'

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

interface JobPlanetProps {
  job: JobData
  color: string
  orbitRadius: number
  orbitSpeed: number
  position: [number, number, number]
  setSelectedObject: (job: JobData | null) => void
}

export function JobPlanet({ 
  job, 
  color, 
  orbitRadius, 
  orbitSpeed, 
  position,
  setSelectedObject 
}: JobPlanetProps): React.ReactElement {
  const meshRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += 0.01
    }
  })

  // Create orbit path geometry
  const orbitGeometry = new THREE.RingGeometry(orbitRadius - 0.1, orbitRadius + 0.1, 64)
  const orbitMaterial = new THREE.LineBasicMaterial({ 
    color: '#1a1a1a',
    transparent: true,
    opacity: 0.3
  })

  return (
    <group>
      {/* Orbit path */}
      <lineSegments geometry={orbitGeometry} material={orbitMaterial} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* Planet */}
      <motion.mesh
        ref={meshRef}
        position={position}
        animate={{
          scale: hovered ? 1.2 : 1,
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
        onClick={(e) => {
          e.stopPropagation()
          setClicked(!clicked)
          setSelectedObject(clicked ? null : job)
        }}
      >
        <Sphere args={[1.5, 32, 32]}>
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.7}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </Sphere>

        {/* Company name label */}
        {hovered && (
          <Html
            center
            style={{
              background: 'rgba(0,0,0,0.8)',
              padding: '6px 10px',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '14px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              transform: 'translateY(-30px)'
            }}
          >
            {job.company}
          </Html>
        )}
      </motion.mesh>
    </group>
  )
} 