interface ViewerDebug {
  getCameraPosition: () => [number, number, number]
}

declare global {
  interface Window {
    __viewerDebug?: ViewerDebug
  }
}

export {}
