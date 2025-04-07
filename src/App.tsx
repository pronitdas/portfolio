import { Suspense } from 'react'
import { Loading } from './components/Loading'
import { SciFiDashboard } from './components/sci-fi-dashboard';
import Hero from './components/Hero'
import '../app/globals.css';

function App() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Hero Section with Glitch Effect */}
      <div className="absolute inset-0 z-10">
        <Hero />
      </div>

      {/* 3D Interactive Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<Loading />}>
          <SciFiDashboard />
        </Suspense>
      </div>
    </main>
  )
}

export default App 