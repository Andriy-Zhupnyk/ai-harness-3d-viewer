import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InfoOverlay } from '../../src/components/InfoOverlay'

describe('InfoOverlay', () => {
  it('renders the rotate/zoom instructions', () => {
    render(<InfoOverlay />)

    expect(screen.getByText('Drag to rotate · Scroll to zoom')).toBeInTheDocument()
  })
})
