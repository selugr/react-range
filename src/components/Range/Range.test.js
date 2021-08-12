/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react'
import Range from './Range'

class ResizeObserver {
    observe () {}
    unobserve () {}
}

window.ResizeObserver = ResizeObserver

describe('continous range', () => {
    const values = [1.99, 5.99]
    let min = values[0]
    let max = values.slice(-1)

    const onChangeMinMockHandler = newMin => {
        min = newMin
    }
    const onChangeMaxMockHandler = newMax => {
        max = newMax
    }

    beforeEach(() => {
        render(
            <Range
                rangeValues={values}
                onChangeMin={onChangeMinMockHandler}
                onChangeMax={onChangeMaxMockHandler}
            />
        )
    })

    afterEach(cleanup)

    test('renders min price', async () => {
        const minInput = screen.getAllByRole('textbox', { value: '1.99€' })
        await waitFor(() => {
            setTimeout(() => {
                expect(minInput).toBeInTheDocument()
            }, 500)
        })
    })

    test('renders max price', async () => {
        const maxInput = screen.getAllByRole('textbox', { value: '70.99€' })
        await waitFor(() => {
            setTimeout(() => {
                expect(maxInput).toBeInTheDocument()
            }, 500)
        })
    })

    test('onChangeMin callback is called on a min input filter change', async () => {
        const bullet = screen.getAllByRole('slider')[0]
        fireEvent.pointerDown(bullet)
        fireEvent.pointerMove(bullet, { movementX: 50 })

        await waitFor(() => {
            setTimeout(() => {
                expect(min).toBeGreaterThan(values.slice(-1))
            }, 500)
        })
        fireEvent.pointerUp(bullet)
    })

    test('onChangeMax callback is called on a max input filter change', async () => {
        const bullet = screen.getAllByRole('slider')[1]
        fireEvent.pointerDown(bullet)
        fireEvent.pointerMove(bullet, { movementX: -50 })

        await waitFor(() => {
            setTimeout(() => {
                expect(max).toBeLessThan(values[1])
            }, 500)
        })
        fireEvent.pointerUp(bullet)
    })
})

describe('continous range which updates filters on end', () => {
    const values = [1.99, 5.99]
    let min = values[0]
    let max = values[1]

    const onChangeMinMockHandler = newMin => {
        min = newMin
    }
    const onChangeMaxMockHandler = newMax => {
        max = newMax
    }

    beforeEach(() => {
        render(
            <Range
                rangeValues={values}
                onChangeMin={onChangeMinMockHandler}
                onChangeMax={onChangeMaxMockHandler}
                updateOnEnd
            />
        )
    })

    afterEach(cleanup)

    test('onChangeMin callback is called on the end of a min input filter change', async () => {
        const bullet = screen.getAllByRole('slider')[0]
        fireEvent.pointerDown(bullet)
        fireEvent.pointerMove(bullet, { movementX: 50 })

        await waitFor(() => {
            setTimeout(() => {
                expect(min).toBe(values[0])
            }, 500)
        })
        fireEvent.pointerUp(bullet)

        await waitFor(() => {
            setTimeout(() => {
                expect(min).toBeGreaterThan(values.slice(-1))
            }, 500)
        })
    })

    test('onChangeMax callback is called on the end of a max input filter change', async () => {
        const bullet = screen.getAllByRole('slider')[1]
        fireEvent.pointerDown(bullet)
        fireEvent.pointerMove(bullet, { movementX: -50 })

        await waitFor(() => {
            setTimeout(() => {
                expect(max).toBe(values.slice(-1))
            }, 500)
        })

        fireEvent.pointerUp(bullet)

        await waitFor(() => {
            setTimeout(() => {
                expect(max).toBeLessThan(values.slice(-1))
            }, 500)
        })
    })
})

describe('staggered range', () => {
    beforeEach(() => {
        render(
            <Range
                rangeValues={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]}
                onChangeMin={() => {}}
                onChangeMax={() => {}}
            />
        )
    })

    afterEach(cleanup)

    test('renders min price', async () => {
        const number = screen.getByText('1.99€')
        await waitFor(() => {
            setTimeout(() => {
                expect(number).toBeInTheDocument()
            }, 500)
        })
    })

    test('renders max price', async () => {
        const number = screen.getByText('70.99€')
        await waitFor(() => {
            setTimeout(() => {
                expect(number).toBeInTheDocument()
            }, 500)
        })
    })
})
