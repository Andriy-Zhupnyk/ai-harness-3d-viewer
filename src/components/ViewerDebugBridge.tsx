import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

// Avoids brittle screenshot diffing in the e2e smoke test.
export function ViewerDebugBridge() {
  const { camera } = useThree()

  useEffect(() => {
    window.__viewerDebug = {
      getCameraPosition: () => camera.position.toArray(),
    }
    return () => {
      delete window.__viewerDebug
    }
  }, [camera])

  return null
}
