import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MODELS, type ModelId } from '../models'
import { ViewerDebugBridge } from './ViewerDebugBridge'

interface SceneProps {
  modelId: ModelId
}

export function Scene({ modelId }: SceneProps) {
  // ModelId is derived from MODELS itself, so this lookup can't miss.
  const ActiveModel = MODELS.find((model) => model.id === modelId)!.Component

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ViewerDebugBridge modelId={modelId} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} />
      <pointLight position={[-4, -2, -3]} intensity={0.4} color="#7c5cff" />
      <ActiveModel />
      <OrbitControls enableDamping dampingFactor={0.08} minDistance={2.5} maxDistance={10} />
    </Canvas>
  )
}
