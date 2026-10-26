import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const IDLE_SPIN_RADIANS_PER_SECOND = 0.15

export function RotatingObject() {
  const meshRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * IDLE_SPIN_RADIANS_PER_SECOND
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.32, 220, 32]} />
      <meshStandardMaterial color="#7c5cff" metalness={0.4} roughness={0.25} />
    </mesh>
  )
}
