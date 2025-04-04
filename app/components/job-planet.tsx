'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

export function JobPlanet({ job, position, color, setSelectedObject }) {
  const planetRef = useRef()
  const textRef = useRef()

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group position={position}>
      <Sphere
        ref={planetRef}
        args={[3, 32, 32]}
        onClick={() => setSelectedObject(job)}
      >
        <meshStandardMaterial
          color={new THREE.Color(color)}
          metalness={0.4}
          roughness={0.7}
        />
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

