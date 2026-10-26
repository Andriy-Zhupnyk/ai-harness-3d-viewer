import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import type { ModelId } from '../models'

interface ViewerDebugBridgeProps {
  modelId: ModelId
}

// Avoids brittle screenshot diffing in the e2e smoke test.
export function ViewerDebugBridge({ modelId }: ViewerDebugBridgeProps) {
  const { camera } = useThree()

  useEffect(() => {
    window.__viewerDebug = {
      getCameraPosition: () => camera.position.toArray(),
      modelId,
    }
    return () => {
      delete window.__viewerDebug
    }
  }, [camera, modelId])

  return null
}
