import type { Mesh } from 'three'
import { useIdleSpin } from './useIdleSpin'

export function TorusKnot() {
  const meshRef = useIdleSpin<Mesh>()

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.32, 220, 32]} />
      <meshStandardMaterial color="#7c5cff" metalness={0.4} roughness={0.25} />
    </mesh>
  )
}
