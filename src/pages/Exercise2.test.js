import { render, screen, waitFor } from '@testing-library/react'
import ResizeObserver from 'resize-observer-polyfill'
import { LABELS } from '../components/Range/Range'
import Exercise2 from './Exercise2'

window.ResizeObserver = ResizeObserver

test( 'range component in staggered mode renders', async () => {
    render( <Exercise2 /> )
    waitFor( () => {
        const marquee = screen.getByRole( 'marquee', { name: LABELS.MIN } )
        expect( marquee ).toBeInTheDocument()
    } )
} )
