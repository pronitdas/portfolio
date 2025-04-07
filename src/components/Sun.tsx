import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface SunProps {
  position: [number, number, number]
}

export function Sun({ position }: SunProps): React.ReactElement {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.003
    }
  })

  return (
    <group position={position}>
      {/* Core sun sphere */}
      <mesh ref={meshRef}>
        <Sphere args={[3, 32, 32]}>
          <meshStandardMaterial
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </Sphere>
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <Sphere args={[3.2, 32, 32]}>
          <meshBasicMaterial
            color="#00f3ff"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>
      </mesh>

      {/* Outer glow */}
      <mesh>
        <Sphere args={[3.5, 32, 32]}>
          <meshBasicMaterial
            color="#00f3ff"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      </mesh>

      {/* Point light for illumination */}
      <pointLight
        color="#00f3ff"
        intensity={5}
        distance={50}
        decay={2}
      />
    </group>
  )
} 