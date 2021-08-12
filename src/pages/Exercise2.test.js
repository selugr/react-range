/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react'
import Exercise2 from './Exercise2'

class ResizeObserver {
    observe () {}
    unobserve () {}
}

window.ResizeObserver = ResizeObserver

test('renders range component', async () => {
    render(<Exercise2 />)
    await waitFor(() => {
        setTimeout(() => {
            const label = screen.getByText('1.99€')
            expect(label).toBeInTheDocument()
        }, 500)
    })
})
