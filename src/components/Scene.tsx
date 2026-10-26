import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { RotatingObject } from './RotatingObject'
import { ViewerDebugBridge } from './ViewerDebugBridge'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ViewerDebugBridge />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} />
      <pointLight position={[-4, -2, -3]} intensity={0.4} color="#7c5cff" />
      <RotatingObject />
      <OrbitControls enableDamping dampingFactor={0.08} minDistance={2.5} maxDistance={10} />
    </Canvas>
  )
}
