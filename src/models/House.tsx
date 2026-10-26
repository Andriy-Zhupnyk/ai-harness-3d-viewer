import type { Group } from 'three'
import { useIdleSpin } from './useIdleSpin'

export function House() {
  const groupRef = useIdleSpin<Group>()

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      <mesh>
        <boxGeometry args={[1.6, 1, 1.4]} />
        <meshStandardMaterial color="#e8c07d" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.85, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.25, 0.9, 4]} />
        <meshStandardMaterial color="#b3503f" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.15, 0.73]}>
        <boxGeometry args={[0.4, 0.7, 0.04]} />
        <meshStandardMaterial color="#5a3a24" roughness={0.7} />
      </mesh>
    </group>
  )
}
