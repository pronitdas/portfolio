
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Trail, Text } from '@react-three/drei'
import * as THREE from 'three'

interface Comet {
  position: THREE.Vector3
  velocity: THREE.Vector3
  achievement: string
}

export function AchievementComets({ achievements = [] }) {
  const cometsRef = useRef<Comet[]>([])

  const initializeComets = useMemo(() => {
    return achievements.map((achievement): Comet => ({
      position: new THREE.Vector3(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      ),
      velocity: new THREE.Vector3(
        Math.random() * 0.2 - 0.1,
        Math.random() * 0.2 - 0.1,
        Math.random() * 0.2 - 0.1
      ),
      achievement
    }))
  }, [achievements])

  useEffect(() => {
    cometsRef.current = initializeComets
  }, [initializeComets])

  useFrame(() => {
    cometsRef.current.forEach(comet => {
      comet.position.add(comet.velocity)
      if (comet.position.length() > 100) {
        comet.position.setLength(100)
        comet.velocity.negate()
      }
    })
  })

  return (
    <>
      {cometsRef.current.map((comet, index) => (
        <group key={index}>
          <Trail
            width={0.5}
            length={8}
            color={new THREE.Color(0x88ccff)}
            attenuation={(t) => t * t}
          >
            <Sphere args={[0.5, 16, 16]} position={comet.position}>
              <meshBasicMaterial color={0x88ccff} />
            </Sphere>
          </Trail>
          <Text
            position={comet.position.clone().add(new THREE.Vector3(0, 1, 0))}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {comet.achievement}
          </Text>
        </group>
      ))}
    </>
  )
}

