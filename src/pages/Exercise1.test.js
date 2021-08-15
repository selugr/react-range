import { render, screen } from '@testing-library/react'
import ResizeObserver from 'resize-observer-polyfill'
import { LABELS } from '../components/Range/Range'
import Exercise1 from './Exercise1'

window.ResizeObserver = ResizeObserver

test( 'range component in continuous mode renders', () => {
    render( <Exercise1 /> )
    const input = screen.getByRole( 'textbox', { name: LABELS.MIN } )
    expect( input ).toBeInTheDocument()
} )
