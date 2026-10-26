import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ObjectPicker } from '../../src/components/ObjectPicker'
import { MODELS } from '../../src/models'

describe('ObjectPicker', () => {
  it('renders one button per model and marks the active one', () => {
    render(<ObjectPicker activeId="house" onSelect={vi.fn()} />)

    for (const model of MODELS) {
      expect(screen.getByRole('button', { name: model.label })).toBeInTheDocument()
    }
    expect(screen.getByRole('button', { name: 'House' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Torus Knot' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('calls onSelect with the clicked model id', () => {
    const onSelect = vi.fn()
    render(<ObjectPicker activeId="torus-knot" onSelect={onSelect} />)

    fireEvent.click(screen.getByRole('button', { name: 'House' }))

    expect(onSelect).toHaveBeenCalledWith('house')
  })
})
