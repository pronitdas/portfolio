'use client'

import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Text, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'
import { planetVertex, planetFragment } from '../shaders/planet'
import { Object3D, Mesh } from 'three'

// Create a custom shader material
const PlanetMaterial = shaderMaterial(
  {
    time: 0,
    baseColor: new THREE.Color(0.4, 0.4, 0.7),
    glowColor: new THREE.Color(0.1, 0.3, 0.9),
    noiseScale: 3.0,
    glowIntensity: 0.4
  },
  planetVertex,
  planetFragment
)

// Extend the component library with the custom material
extend({ PlanetMaterial })

// Add type for our custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      planetMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.RefObject<any>
      }
    }
  }
}

export function JobPlanet({ job, position, color, setSelectedObject }) {
  const planetRef = useRef<Mesh>(null)
  const materialRef = useRef<any>(null)
  const textRef = useRef<Object3D>(null)
  const { clock } = useThree()
  
  // Convert hex color to THREE.Color
  const threeColor = new THREE.Color(color)
  
  // Set unique shader parameters based on the job
  useEffect(() => {
    if (materialRef.current) {
      // Derive color variations from the base color
      materialRef.current.uniforms.baseColor.value = threeColor
      
      // Create a complementary glow color
      const hsl = { h: 0, s: 0, l: 0 }
      threeColor.getHSL(hsl)
      const glowColor = new THREE.Color().setHSL(
        (hsl.h + 0.5) % 1.0, // Opposite hue
        Math.max(0.5, hsl.s),
        Math.max(0.7, hsl.l)
      )
      materialRef.current.uniforms.glowColor.value = glowColor
      
      // Vary noise scale based on the job name length
      materialRef.current.uniforms.noiseScale.value = 2.0 + (job.company.length % 5)
      
      // Vary glow intensity based on job position
      const roleComplexity = job.position.length / 10
      materialRef.current.uniforms.glowIntensity.value = 0.3 + roleComplexity * 0.1
    }
  }, [job, threeColor])

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <group position={position}>
      <Sphere
        ref={planetRef}
        args={[3, 32, 32]}
        onClick={() => setSelectedObject(job)}
      >
        <planetMaterial ref={materialRef} />
      </Sphere>
      <Text
        ref={textRef}
        position={[0, 4, 0]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {job.company}
      </Text>
      {job.projects.map((project, index) => (
        <Sphere
          key={project.name}
          args={[0.5, 16, 16]}
          position={[
            Math.cos(index * (Math.PI * 2 / job.projects.length)) * 5,
            Math.sin(index * (Math.PI * 2 / job.projects.length)) * 5,
            0
          ]}
          onClick={() => setSelectedObject({ ...job, selectedProject: project })}
        >
          <meshStandardMaterial color="cyan" />
        </Sphere>
      ))}
    </group>
  )
}

