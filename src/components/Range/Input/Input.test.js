import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'

test( 'value and currency symbol in a readonly Input are shown properly', () => {
    render(
        <Input
            value='2.00'
            readonly={ true }
            onChange={ () => {} }
            onModify={ () => {} }
        />
    )
    const marquee = screen.getByText( '2.00€' )
    expect( marquee ).toBeInTheDocument()
} )

describe( 'behaviours on typing', () => {
    let value = '2.00€'
    let typing = false

    const onChangeMockHandler = jest.fn( newValue => { value = newValue } )
    const onModifyMockHandler = jest.fn( isTyping => { typing = isTyping } )

    const setup = () => {
        const component = render(
            <Input
                value={ value }
                readonly={ false }
                onChange={ onChangeMockHandler }
                onModify={ onModifyMockHandler }
                ariaLabel='input filter'
            />
        )
        const input = screen.getByRole( 'textbox', { name: 'input filter' } )
        return {
            input,
            ...component
        }
    }

    beforeEach( () => {
        jest.clearAllMocks()
    } )

    it( 'triggers onChange callback and updates the input element when typing a new value', () => {
        const { input } = setup()
        fireEvent.input( input, { target: { value: '23.00' } } )
        fireEvent.blur( input )

        expect( onChangeMockHandler ).toHaveBeenCalledTimes( 1 )
        expect( value ).toBe( '23.00' )
    } )

    it( 'triggers onModify callback on focusing and blurring', () => {
        const { input } = setup()
        onModifyMockHandler.mockClear()

        fireEvent.focus( input )
        expect( typing ).toBeTruthy()

        fireEvent.blur( input )
        expect( typing ).toBeFalsy()

        expect( onModifyMockHandler ).toHaveBeenCalledTimes( 2 )
    } )

    it( 'keeps data consistency when an invalid input is typed', () => {
        const { input } = setup()
        fireEvent.input( input, { target: { value: 'asdf..' } } )
        fireEvent.blur( input )
        expect( value ).toBe( '23.00' )
    } )
} )
