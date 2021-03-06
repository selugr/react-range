import { useState, useEffect } from 'react'
import { validateNumber, roundingToTwoDecimals } from '../Utils/Utils'
import './Input.css'

const Input = (
    {
        value,
        onChange,
        onModify,
        ariaLabel,
        readonly
    }
) => {
    const [inputValue, setInputValue] = useState( 0 )
    const [isTyping, setIsTyping] = useState( false )

    useEffect( () => {
        if ( !isTyping ) {
            setInputValue( roundingToTwoDecimals( value ) )
        }
    }, [value] )

    useEffect( () => {
        onModify( isTyping )
    }, [isTyping] )

    const handleOnChange = value => {
        const validValue = validateNumber( value )
        setInputValue( validValue )
        if ( validValue && !isNaN( validValue ) ) {
            onChange( validValue )
        }
    }

    const handleOnBlur = () => {
        setInputValue( roundingToTwoDecimals( value ) )
        setIsTyping( false )
    }

    if ( readonly ) {
        return (
            <span
                role="marquee"
                aria-label={ ariaLabel }
                className="range-currency"
            >
                {`${roundingToTwoDecimals( value )}€`}
            </span>
        )
    }

    return (
        <input className="range-currency"
            type="text"
            aria-label={ ariaLabel }
            onChange={ e => handleOnChange( e.target.value ) }
            value={ ( isTyping ? inputValue : `${roundingToTwoDecimals( value )}€` ) }
            onFocus={ () => setIsTyping( true ) }
            onBlur={ handleOnBlur }
            pattern="/^\d*(\.\d{1,2})?€?$/g"
        />
    )
}

export default Input
