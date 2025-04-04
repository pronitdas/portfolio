'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

export function Sun({ position }) {
  const sunRef = useRef()

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Sphere ref={sunRef} args={[5, 32, 32]} position={position}>
      <meshBasicMaterial color="#FDB813" />
      <pointLight color="#FDB813" intensity={1} distance={100} />
    </Sphere>
  )
}

