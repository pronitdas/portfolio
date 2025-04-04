'use client'

import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { CosmicSystem } from './cosmic-system'
import { HUD } from './hud'

export default function SciFiDashboard() {
  const [selectedObject, setSelectedObject] = useState(null)
  
  return (
    <>
      <HUD selectedObject={selectedObject} />
      <Canvas className="w-full h-screen">
        <PerspectiveCamera makeDefault position={[0, 40, 80]} />
        <OrbitControls 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
        
        <ambientLight intensity={0.1} />
        
        <Suspense fallback={null}>
          <CosmicSystem setSelectedObject={setSelectedObject} />
        </Suspense>

        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true} />
      </Canvas>
    </>
  )
}

