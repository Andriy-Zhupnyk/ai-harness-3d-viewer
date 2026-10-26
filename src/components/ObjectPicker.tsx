import { MODELS, type ModelId } from '../models'

interface ObjectPickerProps {
  activeId: ModelId
  onSelect: (id: ModelId) => void
}

export function ObjectPicker({ activeId, onSelect }: ObjectPickerProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      {MODELS.map((model) => {
        const isActive = model.id === activeId
        return (
          <button
            key={model.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(model.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              border: '1px solid rgba(255, 255, 255, 0.25)',
              background: isActive ? '#7c5cff' : 'rgba(255, 255, 255, 0.08)',
              color: 'white',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {model.label}
          </button>
        )
      })}
    </div>
  )
}
