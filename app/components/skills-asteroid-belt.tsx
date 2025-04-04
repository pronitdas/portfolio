
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

export function SkillsAsteroidBelt({ skills = [], radius = 25 }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  console.log('SkillsAsteroidBelt - skills:', skills)

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        if (!skill) {
          console.error('SkillsAsteroidBelt - Invalid skill:', skill)
          return null
        }
        const angle = (index / skills.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <group key={skill} position={[x, 0, z]}>
            <Sphere args={[0.5, 16, 16]}>
              <meshStandardMaterial color={new THREE.Color().setHSL(index / skills.length, 0.5, 0.5)} />
            </Sphere>
            <Text
              position={[0, 1, 0]}
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {skill}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

