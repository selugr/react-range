/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react'
import Bullet from './Bullet'

class ResizeObserver {
    observe () {}
    unobserve () {}
}

window.ResizeObserver = ResizeObserver

describe('bullet behaviours', () => {
    const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
    let value = values[0]
    let moving = false

    const onChangeMockHandler = newValue => {
        value = newValue
    }
    const onModifyMockHandler = isMoving => {
        moving = isMoving
    }

    const setup = () => {
        const component = render(
            <Bullet
                value={value}
                values={values}
                onChange={onChangeMockHandler}
                onModify={onModifyMockHandler}
                limit={values[3]}
                filtersOffset={2}
            />
        )
        const bullet = screen.getByRole('slider')
        return {
            bullet,
            ...component
        }
    }

    afterEach(cleanup)

    test('renders a bullet', async () => {
        const { bullet } = setup()
        await waitFor(() => {
            setTimeout(() => {
                expect(bullet).toBeInTheDocument()
            }, 500)
        })
    })

    test('triggers onChange callback when moving', async () => {
        const { bullet } = setup()

        fireEvent.pointerDown(bullet)
        fireEvent.pointerMove(bullet, { movementX: 50 })
        fireEvent.pointerUp(bullet)

        await waitFor(() => {
            setTimeout(() => {
                expect(value).toBeGreaterThan(0)
            }, 500)
        })
    })

    test('triggers onModify callback when moving and blurring', async () => {
        const { bullet } = setup()

        fireEvent.pointerDown(bullet)

        fireEvent.pointerMove(bullet, { movementX: 50 })
        expect(moving).toBeTruthy()

        fireEvent.pointerUp(bullet)
        expect(moving).toBeFalsy()
    })
})
