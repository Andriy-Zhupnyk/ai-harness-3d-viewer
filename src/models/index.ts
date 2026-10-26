import type { ComponentType } from 'react'
import { TorusKnot } from './TorusKnot'
import { House } from './House'

export const MODELS = [
  { id: 'torus-knot', label: 'Torus Knot', Component: TorusKnot },
  { id: 'house', label: 'House', Component: House },
] as const satisfies ReadonlyArray<{ id: string; label: string; Component: ComponentType }>

export type ModelId = (typeof MODELS)[number]['id']
