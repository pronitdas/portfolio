import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { InteractiveDuck } from './interactive-duck'
import { Navigation } from './navigation'
import { Projects } from './projects'
import { Contact } from './contact'
import { About } from './about'
import { Skills } from './skills'
import { WorkExperience } from './work-experience'
import { Achievements } from './achievements'

export default function Experience() {
  const [section, setSection] = useState('home')
  
  return (
    <>
      <Navigation currentSection={section} onNavigate={setSection} />
      <Canvas className="w-full h-screen">
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <OrbitControls 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          maxDistance={15}
          minDistance={5}
        />
        
        <Environment preset="night" />
        
        <Float floatIntensity={2} rotationIntensity={0.5}>
          <Suspense fallback={null}>
            {/* <InteractiveDuck position={[0, 0, 0]} scale={2} rotation={[0, Math.PI / 4, 0]} /> */}
          </Suspense>
        </Float>

        {section === 'about' && <About position={[-2, 0, 0]} />}
        {section === 'projects' && <Projects position={[2, 0, 0]} />}
        {section === 'contact' && <Contact position={[0, 0, 2]} />}
        {section === 'skills' && <Skills position={[-2, 0, 2]} />}
        {section === 'experience' && <WorkExperience position={[2, 0, -2]} />}
        {section === 'achievements' && <Achievements position={[0, 0, -2]} />}

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <gridHelper 
          args={[30, 30, '#4c1d95', '#2e1065']}
          position={[0, -2, 0]}
          rotation={[0, 0, 0]}
        />
      </Canvas>
    </>
  )
}

