import { render, fireEvent, screen } from '@testing-library/react'
import { PointerEventFake } from './Utils/TestUtils'
import ResizeObserver from 'resize-observer-polyfill'
import Range, { LABELS } from './Range'

window.ResizeObserver = ResizeObserver
window.PointerEvent = PointerEventFake

describe( 'continuous range', () => {
    const values = [1.99, 70.99]
    let min = values[0]
    let max = values.slice( -1 ).shift()

    const onChangeMinMockHandler = jest.fn( newValue => { min = +newValue } )
    const onChangeMaxMockHandler = jest.fn( newValue => { max = +newValue } )

    beforeEach( () => {
        render(
            <Range
                rangeValues={ values }
                onChangeMin={ onChangeMinMockHandler }
                onChangeMax={ onChangeMaxMockHandler }
            />
        )
        jest.clearAllMocks()
    } )

    it( 'renders min price input', () => {
        const minInput = screen.getByRole( 'textbox', { name: LABELS.MIN } )
        expect( minInput ).toBeInTheDocument()
    } )

    it( 'renders max price input', () => {
        const maxInput = screen.getByRole( 'textbox', { name: LABELS.MAX } )
        expect( maxInput ).toBeInTheDocument()
    } )

    it( 'renders min price slider', () => {
        const minInput = screen.getByRole( 'slider', { name: LABELS.MIN } )
        expect( minInput ).toBeInTheDocument()
    } )

    it( 'renders max price slider', () => {
        const maxInput = screen.getByRole( 'slider', { name: LABELS.MAX } )
        expect( maxInput ).toBeInTheDocument()
    } )

    it( 'calls onChangeMin callback on a min input filter change', () => {
        const bullet = screen.getAllByRole( 'slider' )[0]
        fireEvent.pointerDown( bullet )
        fireEvent.pointerMove( bullet, { movementX: 1 } )
        expect( onChangeMinMockHandler ).toHaveBeenCalled()
        fireEvent.pointerUp( bullet )
        expect( min ).toBeGreaterThan( values[0] )
        expect( min ).toBeLessThan( values[1] )
    } )

    it( 'calls onChangeMax callback on a max input filter change', () => {
        const bullet = screen.getAllByRole( 'slider' )[1]
        fireEvent.pointerDown( bullet )
        fireEvent.pointerMove( bullet, { movementX: -1 } )
        expect( onChangeMaxMockHandler ).toHaveBeenCalled()
        fireEvent.pointerUp( bullet )
        expect( max ).toBeLessThan( values[1] )
        expect( max ).toBeGreaterThan( values[0] )
    } )
} )

describe( 'continuous range which updates filters on end', () => {
    const values = [1.99, 5.99]
    let min = values[0]
    let max = values[1]

    const onChangeMinMockHandler = jest.fn( newValue => { min = +newValue } )
    const onChangeMaxMockHandler = jest.fn( newValue => { max = +newValue } )

    beforeEach( () => {
        render(
            <Range
                rangeValues={ values }
                onChangeMin={ onChangeMinMockHandler }
                onChangeMax={ onChangeMaxMockHandler }
                updateOnEnd
            />
        )
        jest.clearAllMocks()
    } )

    it( 'calls onChangeMin callback on the end of a min input filter change', () => {
        const bullet = screen.getAllByRole( 'slider' )[0]
        fireEvent.pointerDown( bullet )

        fireEvent.pointerMove( bullet, { movementX: 1 } )
        expect( min ).toBe( values[0] )
        expect( onChangeMinMockHandler ).toHaveBeenCalledTimes( 0 )

        fireEvent.pointerUp( bullet )
        expect( min ).toBeGreaterThan( values[0] )
        expect( onChangeMinMockHandler ).toHaveBeenCalledTimes( 1 )
    } )

    it( 'calls onChangeMax callback on the end of a max input filter change', () => {
        const bullet = screen.getAllByRole( 'slider' )[1]
        fireEvent.pointerDown( bullet )

        fireEvent.pointerMove( bullet, { movementX: -1 } )
        expect( max ).toBe( values[1] )
        expect( onChangeMaxMockHandler ).toHaveBeenCalledTimes( 0 )

        fireEvent.pointerUp( bullet )
        expect( max ).toBeLessThan( values[1] )
        expect( onChangeMaxMockHandler ).toHaveBeenCalledTimes( 1 )
    } )
} )

describe( 'staggered range', () => {
    const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]

    let min = values[0]
    let max = values.slice( -1 ).shift()
    const onChangeMinMockHandler = jest.fn( newValue => { min = +newValue } )
    const onChangeMaxMockHandler = jest.fn( newValue => { max = +newValue } )

    beforeEach( () => {
        render(
            <Range
                rangeValues={ values }
                onChangeMin={ onChangeMinMockHandler }
                onChangeMax={ onChangeMaxMockHandler }
            />
        )
        jest.clearAllMocks()
    } )

    it( 'renders min price label', () => {
        const number = screen.getByText( '1.99€' )
        expect( number ).toBeInTheDocument()
    } )

    it( 'renders max price label', () => {
        const number = screen.getByText( '70.99€' )
        expect( number ).toBeInTheDocument()
    } )

    it( 'calls onChangeMin callback on a min input filter change', () => {
        const bullet = screen.getAllByRole( 'slider' )[0]
        fireEvent.pointerDown( bullet )
        fireEvent.pointerMove( bullet, { movementX: 1 } )
        expect( onChangeMinMockHandler ).toHaveBeenCalled()
        fireEvent.pointerUp( bullet )
        expect( min ).toBeGreaterThan( values[0] )
        expect( min ).toBeLessThan( values.slice( -1 ).shift() )
    } )

    it( 'calls onChangeMax callback on a max input filter change', () => {
        const bullet = screen.getAllByRole( 'slider' )[1]
        fireEvent.pointerDown( bullet )
        fireEvent.pointerMove( bullet, { movementX: -1 } )
        expect( onChangeMaxMockHandler ).toHaveBeenCalled()
        fireEvent.pointerUp( bullet )
        expect( max ).toBeLessThan( values.slice( -1 ).shift() )
        expect( max ).toBeGreaterThan( values[0] )
    } )
} )

test( 'throws error when onChange min and max callbacks are not provided', () => {
    jest.spyOn( console, 'error' )
    console.error.mockImplementation( () => {} )

    const notValidFunction = ''

    const renderRange = () => {
        render( <Range
            rangeValues={ [2, 10] }
            onChangeMin={ notValidFunction }
            onChangeMax={ notValidFunction }
        />
        )
    }

    expect( renderRange ).toThrowError()

    console.error.mockRestore()
} )
