import { useState } from 'react'
import { Scene } from './components/Scene'
import { InfoOverlay } from './components/InfoOverlay'
import { ObjectPicker } from './components/ObjectPicker'
import { MODELS, type ModelId } from './models'

export default function App() {
  const [modelId, setModelId] = useState<ModelId>(MODELS[0].id)

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Scene modelId={modelId} />
      <ObjectPicker activeId={modelId} onSelect={setModelId} />
      <InfoOverlay />
    </div>
  )
}
