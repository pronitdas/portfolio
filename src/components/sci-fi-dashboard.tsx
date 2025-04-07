'use client'

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Environment, OrbitControls } from '@react-three/drei';
import { GameProvider } from '../contexts/GameContext';
import { SkillConstellation } from './skill-constellation';
import { ProgressHUD } from './progress-hud';
import { AchievementNotification } from './achievement-notification';

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mb-4 text-2xl font-bold">Loading Experience</div>
        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}

export function SciFiDashboard() {
  return (
    <div className="relative w-full h-screen bg-black">
      <GameProvider>
        <Suspense fallback={<Loading />}>
          <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
            {/* Camera Controls */}
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={10}
              maxDistance={50}
            />
            
            {/* Environment and background */}
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
            <Environment preset="night" />
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 10, 5]} intensity={0.5} />
            
            {/* Game elements */}
            <SkillConstellation />
          </Canvas>
          
          {/* UI overlays */}
          <ProgressHUD />
          <AchievementNotification />
        </Suspense>
      </GameProvider>
    </div>
  );
}

