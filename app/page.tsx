import { Suspense } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Loading } from './components/loading'
import Experience from './components/experience'
import SciFiDashboard from './components/sci-fi-dashboard'

function App() {
  return (
    <main className="w-full h-screen bg-black">
      <Suspense fallback={<Loading />}>
        <SciFiDashboard />
      </Suspense>
    </main>
  )
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

