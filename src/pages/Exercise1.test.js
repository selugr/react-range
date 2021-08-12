/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react'
import Exercise1 from './Exercise1'

class ResizeObserver {
    observe () {}
    unobserve () {}
}

window.ResizeObserver = ResizeObserver

test('renders range component', async () => {
    render(<Exercise1 />)
    await waitFor(() => {
        setTimeout(() => {
            const input = screen.getByRole('textbox', { value: '1.00€' })
            expect(input).toBeInTheDocument()
        }, 500)
    })
})
