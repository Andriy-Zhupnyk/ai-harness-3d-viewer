interface ViewerDebug {
  getCameraPosition: () => [number, number, number]
  modelId: string
}

declare global {
  interface Window {
    __viewerDebug?: ViewerDebug
  }
}

export {}
