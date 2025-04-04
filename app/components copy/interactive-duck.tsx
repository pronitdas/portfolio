
import { useGLTF, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import type { Group, Mesh } from 'three'

export function InteractiveDuck(props: any) {
  const group = useRef<Group>(null)
  // const { nodes, materials } = useGLTF('/assets/3d/duck.glb')
  const { nodes, materials } = [];
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={group} {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        geometry={nodes.LOD3spShape.geometry}
        material={materials.blinn3}
      >
        <meshStandardMaterial
          color={hovered ? "#8b5cf6" : "#4c1d95"}
          emissive={hovered ? "#8b5cf6" : "#4c1d95"}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Hi, I'm Pronit!
        </Text>
      )}
    </group>
  )
}

