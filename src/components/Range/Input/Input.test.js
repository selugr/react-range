/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react'
import Input from './Input'

test('renders value with currency symbol in a readonly Input', async () => {
    render(
        <Input
            value='2.00'
            readonly={true}
            onChange={ () => {}}
            onModify={() => {}}
        />
    )
    const label = screen.getByText('2.00€')
    await waitFor(() => {
        setTimeout(() => {
            expect(label).toBeInTheDocument()
        }, 500)
    })
})

describe('modifiable input', () => {
    beforeEach(() => {
        render(
            <Input
                value='2.00'
                readonly={false}
                onChange={ () => {}}
                onModify={() => {}}
                ariaLabel='filter price'
            />
        )
    })

    afterEach(cleanup)

    test('renders value with currency symbol', async () => {
        const input = screen.getByRole('textbox', { value: '2.00€' })
        await waitFor(() => {
            setTimeout(() => {
                expect(input).toBeInTheDocument()
            }, 500)
        })
    })

    test('renders aria label', async () => {
        const ariaLabel = screen.getByLabelText('filter price')
        await waitFor(() => {
            setTimeout(() => {
                expect(ariaLabel).toBeInTheDocument()
            }, 500)
        })
    })
})

describe('onModify and onChange functions are called when typing', () => {
    let value = '2.00€'
    let typing = false

    const onChangeMockHandler = newValue => {
        value = newValue
    }
    const onModifyMockHandler = isTyping => {
        typing = isTyping
    }

    const setup = () => {
        const component = render(
            <Input
                value={value}
                readonly={false}
                onChange={ onChangeMockHandler }
                onModify={ onModifyMockHandler }
                ariaLabel='filter price'
            />
        )
        const input = screen.getByRole('textbox', { value: '2.00€' })
        return {
            input,
            ...component
        }
    }

    afterEach(cleanup)

    test('writting a new value triggers onChange callback and updates the input element', async () => {
        const { input } = setup()
        fireEvent.input(input, { target: { value: '23.00' } })
        fireEvent.blur(input)

        await waitFor(() => {
            setTimeout(() => {
                expect(input.value).toBe('23.00€')
            }, 500)
        })
    })

    test('focusing and blurring trigger onModify callback', async () => {
        const { input } = setup()
        fireEvent.input(input, { target: { value: '23.00' } })

        await waitFor(() => {
            setTimeout(() => {
                expect(typing).toBeTruthy()
            }, 500)
        })

        fireEvent.blur(input)

        await waitFor(() => {
            setTimeout(() => {
                expect(typing).toBeFalsy()
            }, 500)
        })
    })

    test('invalid input patterns keep data consistency', async () => {
        const { input } = setup()
        fireEvent.input(input, { target: { value: 'asdf..' } })
        fireEvent.blur(input)

        await waitFor(() => {
            setTimeout(() => {
                expect(input.value).toBe('23.00€')
            }, 500)
        })
    })
})
