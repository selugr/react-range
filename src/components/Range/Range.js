import { useState, useEffect } from 'react'
import Bullet from './Bullet/Bullet'
import Input from './Input/Input'
import { getCloserIndexByPercent } from './Utils/Utils'
import './Range.css'

export const LABELS = {
    MIN: 'Minimum filter price',
    MAX: 'Maximum filter price'
}

const Range = (
    {
        rangeValues = [],
        filtersOffset = 1,
        onChangeMin,
        onChangeMax,
        updateOnEnd
    }
) => {
    const [min, setMin] = useState( 0 )
    const [max, setMax] = useState( 0 )
    const [minFilter, setMinFilter] = useState( { value: 0, index: 0 } )
    const [maxFilter, setMaxFilter] = useState( { value: 0, index: 0 } )
    const [values, setValues] = useState( rangeValues )
    const [isModifying, setIsModifying] = useState( false )

    useEffect( () => {
        setValues( [...rangeValues].sort( ( a, b ) => a - b ) )
    }, [rangeValues] )

    useEffect( () => {
        if ( values && values.length >= 2 && values.every( v => !isNaN( v ) ) ) {
            const minValue = values[0]
            const maxValue = values.slice( -1 ).shift()
            setMin( minValue )
            setMax( maxValue )
            setMinFilter(
                {
                    value: minValue,
                    index: 0
                }
            )
            setMaxFilter(
                {
                    value: maxValue,
                    index: values.length - 1
                }
            )
        }
    }, [values] )

    useEffect( () => {
        try {
            if ( !updateOnEnd || ( updateOnEnd && !isModifying ) ) {
                onChangeMin( parseFloat( minFilter.value ).toFixed( 2 ) )
            }
        } catch ( e ) {
            throw new Error( 'You should provide a function to onChangeMin attribute to handle result' )
        }
    }, [minFilter.value, isModifying] )

    useEffect( () => {
        try {
            if ( !updateOnEnd || ( updateOnEnd && !isModifying ) ) {
                onChangeMax( parseFloat( maxFilter.value ).toFixed( 2 ) )
            }
        } catch ( e ) {
            throw new Error( 'You should provide a function to onChangeMax attribute to handle result' )
        }
    }, [maxFilter.value, isModifying] )

    const handleMinFilter = ( value, percent ) => {
        if ( value && !isNaN( value ) ) {
            let inputValue = value
            let index = minFilter.index
            if ( values.length > 2 ) {
                index = getCloserIndexByPercent( percent, values )
                if ( index >= maxFilter.index ) {
                    index = maxFilter.index - 1
                }
                inputValue = values[index]
            } else {
                if ( inputValue < min ) {
                    inputValue = min
                }
                if ( inputValue >= maxFilter.value - filtersOffset ) {
                    inputValue = maxFilter.value - filtersOffset
                }
            }
            setMinFilter( () => {
                return { value: inputValue, index: index }
            } )
        }
    }

    const handleMaxFilter = ( value, percent ) => {
        if ( value && !isNaN( value ) ) {
            let inputValue = value
            let index = maxFilter.index
            if ( values.length > 2 ) {
                index = getCloserIndexByPercent( percent, values )
                if ( index <= minFilter.index ) {
                    index = minFilter.index + 1
                }
                inputValue = values[index]
            } else {
                if ( inputValue > max ) {
                    inputValue = max
                }
                if ( inputValue <= minFilter.value + filtersOffset ) {
                    inputValue = minFilter.value + filtersOffset
                }
            }
            setMaxFilter( () => {
                return { value: inputValue, index: index }
            } )
        }
    }

    const handleIsModifying = modifying => {
        setIsModifying( modifying )
    }

    return (
        <div
            className="range-container"
        >
            <Input
                value={ minFilter.value }
                readonly={ values.length > 2 }
                onChange={ handleMinFilter }
                onModify={ handleIsModifying }
                ariaLabel={ LABELS.MIN }
            />
            <div className="range-slider">
                <span className="range-bar" />
                <Bullet
                    value={ minFilter.value }
                    values={ values }
                    onChange={ handleMinFilter }
                    onModify={ handleIsModifying }
                    limit={ maxFilter }
                    filtersOffset={ filtersOffset }
                    ariaLabel={ LABELS.MIN }
                />
                <Bullet
                    isMax
                    value={ maxFilter.value }
                    values={ values }
                    onChange={ handleMaxFilter }
                    onModify={ handleIsModifying }
                    limit={ minFilter }
                    filtersOffset={ filtersOffset }
                    ariaLabel={ LABELS.MAX }
                />
            </div>
            <Input
                value={ maxFilter.value }
                readonly={ values.length > 2 }
                onChange={ handleMaxFilter }
                onModify={ handleIsModifying }
                ariaLabel={ LABELS.MAX }
            />
        </div>
    )
}

export default Range
