/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

class ResizeObserver {
    observe () {}
    unobserve () {}
}

window.ResizeObserver = ResizeObserver

test('renders control number for inputs', async () => {
    render(<App />)
    const number = screen.findAllByText('0€')
    await waitFor(() => {
        setTimeout(() => {
            expect(number).toBeInTheDocument()
        }, 100)
    })
})
