import { Suspense } from 'react'
import { Loading } from '../app/components/loading'
import SciFiDashboard from '@/app/components/sci-fi-dashboard'

export default function App() {
  return (
    <main className="w-full h-screen bg-black">
      <Suspense fallback={<Loading />}>
        <SciFiDashboard />
      </Suspense>
    </main>
  )
} 