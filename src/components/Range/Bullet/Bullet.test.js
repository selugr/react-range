import { render, screen, fireEvent } from '@testing-library/react'
import { PointerEventFake } from '../Utils/TestUtils'
import ResizeObserver from 'resize-observer-polyfill'
import Bullet from './Bullet'

window.ResizeObserver = ResizeObserver
window.PointerEvent = PointerEventFake

describe( 'bullet behaviours', () => {
    const values = [1.99, 70.99]

    const onChangeMockHandler = jest.fn()
    const onModifyMockHandler = jest.fn()

    const setup = () => {
        const component = render(
            <Bullet
                value={ values[0] }
                values={ values }
                onChange={ onChangeMockHandler }
                onModify={ onModifyMockHandler }
                limit={ values.slice( -1 ).shift() }
                filtersOffset={ 2 }
            />
        )
        const bullet = screen.getByRole( 'slider' )
        return {
            bullet,
            ...component
        }
    }

    beforeEach( () => {
        jest.clearAllMocks()
    } )

    it( 'renders a bullet', () => {
        const { bullet } = setup()
        expect( bullet ).toBeInTheDocument()
    } )

    it( 'triggers onChange callback when moving', () => {
        const { bullet } = setup()

        fireEvent.pointerDown( bullet )
        fireEvent.pointerMove( bullet, { movementX: 1 } )
        fireEvent.pointerUp( bullet )

        expect( onChangeMockHandler ).toHaveBeenCalledTimes( 1 )
    } )

    it( 'triggers onModify callback when moving and blurring', () => {
        const { bullet } = setup()

        onModifyMockHandler.mockClear()

        fireEvent.pointerDown( bullet )
        fireEvent.pointerMove( bullet, { movementX: 1 } )
        fireEvent.pointerUp( bullet )

        expect( onModifyMockHandler ).toHaveBeenCalledTimes( 2 )
    } )
} )
