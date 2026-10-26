import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'

const IDLE_SPIN_RADIANS_PER_SECOND = 0.15

export function useIdleSpin<T extends Mesh | Group>() {
  const ref = useRef<T>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * IDLE_SPIN_RADIANS_PER_SECOND
    }
  })

  return ref
}
