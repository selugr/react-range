import { render, screen } from '@testing-library/react'
import ResizeObserver from 'resize-observer-polyfill'
import App from './App'

window.ResizeObserver = ResizeObserver

test( 'range component renders in landing page', () => {
    render( <App /> )
    const inputs = screen.getAllByRole( 'textbox' )
    expect( inputs ).toHaveLength( 2 )
} )
