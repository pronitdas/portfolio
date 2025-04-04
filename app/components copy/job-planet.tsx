
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Text, Line } from '@react-three/drei'
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

  const orbitPoints = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,            // center x, y
      5, 5,            // x radius, y radius
      0, 2 * Math.PI,  // start angle, end angle
      false,           // clockwise
      0                // rotation
    )

    const points = curve.getPoints(50)
    return points.map(point => new THREE.Vector3(point.x, 0, point.y))
  }, [])

  if (!job) {
    console.error('JobPlanet - Invalid job data:', job)
    return null
  }

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
        {job.company || 'Unknown Company'}
      </Text>
      <Line
        points={orbitPoints}
        color="white"
        lineWidth={1}
        dashed
      />
      {(job.projects || []).map((project, index) => {
        if (!project) {
          console.error('JobPlanet - Invalid project:', project)
          return null
        }
        const angle = (index / (job.projects.length || 1)) * Math.PI * 2
        const x = Math.cos(angle) * 5
        const z = Math.sin(angle) * 5
        return (
          <Sphere
            key={project.name || index}
            args={[0.5, 16, 16]}
            position={[x, 0, z]}
            onClick={() => setSelectedObject({ ...job, selectedProject: project })}
          >
            <meshStandardMaterial color="cyan" />
          </Sphere>
        )
      })}
    </group>
  )
}

