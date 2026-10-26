export function InfoOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        letterSpacing: 0.3,
        opacity: 0.75,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <p>Drag to rotate · Scroll to zoom</p>
    </div>
  )
}
