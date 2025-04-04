
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

export function Workstation(props: any) {
  const group = useRef<Group>(null)
  // const { nodes, materials } = useGLTF('/assets/3d/duck.glb')
  const { nodes, materials } = [];
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={group} {...props}>
      <mesh
        geometry={nodes.LOD3spShape.geometry}
        material={materials.blinn3}
      >
        <meshStandardMaterial
          color="#4c1d95"
          emissive="#4c1d95"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

