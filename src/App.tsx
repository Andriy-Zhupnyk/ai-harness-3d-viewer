import { Scene } from './components/Scene'
import { InfoOverlay } from './components/InfoOverlay'

export default function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Scene />
      <InfoOverlay />
    </div>
  )
}
