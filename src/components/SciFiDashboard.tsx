'use client'

import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { CosmicSystem } from './CosmicSystem'
import { HUD } from './HUD'
import { Loading } from './Loading'

// Define the JobData type (consider moving to a central types file)
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

export default function SciFiDashboard(): React.ReactElement {
  const [selectedObject, setSelectedObject] = useState<JobData | null>(null)
  
  return (
    <div className="fixed inset-0 bg-black">
      <HUD selectedObject={selectedObject} />
      <Canvas
        className="!fixed inset-0"
        camera={{ position: [0, 20, 50], fov: 60 }}
        style={{ background: '#000000' }}
      >
        <color attach="background" args={['#000000']} />
        
        <PerspectiveCamera makeDefault position={[0, 20, 50]} />
        <OrbitControls 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          maxDistance={100}
          minDistance={20}
        />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#00f3ff" />
        <hemisphereLight intensity={0.1} groundColor="#000000" />
        
        <Suspense fallback={<Loading />}>
          <CosmicSystem setSelectedObject={setSelectedObject} />
        </Suspense>

        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade={true} 
          speed={1} 
        />
      </Canvas>
    </div>
  )
} 