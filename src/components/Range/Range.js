import { useState, useEffect } from 'react'
import Bullet from './Bullet/Bullet'
import Input from './Input/Input'
import { getCloserIndexByPercent } from './Utils/Utils'
import './Range.css'

const Range = (
    {
        rangeValues = [],
        filtersOffset = 1,
        onChangeMin,
        onChangeMax,
        updateOnEnd
    }
) => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [minFilter, setMinFilter] = useState({ value: 0, index: 0 })
    const [maxFilter, setMaxFilter] = useState({ value: 0, index: 0 })
    const [values, setValues] = useState(rangeValues)
    const [isModifying, setIsModifying] = useState(false)

    useEffect(() => {
        setValues([...rangeValues].sort((a, b) => a - b))
    }, [rangeValues])

    useEffect(() => {
        if (values && values.length >= 2 && values.every(v => !isNaN(v))) {
            setMin(parseFloat(values[0]).toFixed(2))
            setMax(parseFloat(values.slice(-1)).toFixed(2))
            setMinFilter(
                {
                    value: parseFloat(values[0]).toFixed(2),
                    index: 0
                }
            )
            setMaxFilter(
                {
                    value: parseFloat(values.slice(-1)).toFixed(2),
                    index: values.length - 1
                }
            )
        }
    }, [values])

    useEffect(() => {
        try {
            if (!updateOnEnd || (updateOnEnd && !isModifying)) {
                onChangeMin(minFilter.value)
            }
        } catch (e) {
            console.error('You should provide a function to onChangeMin attribute to handle result')
        }
    }, [minFilter.value, isModifying])

    useEffect(() => {
        try {
            if (!updateOnEnd || (updateOnEnd && !isModifying)) {
                onChangeMax(maxFilter.value)
            }
        } catch (e) {
            console.error('You should provide a function to onChangeMax attribute to handle result')
        }
    }, [maxFilter.value, isModifying])

    const handleMinFilter = (value, percent) => {
        if (value && !isNaN(value)) {
            let inputValue = +value
            let index = minFilter.index
            if (values.length > 2) {
                index = getCloserIndexByPercent(percent, values)
                if (index >= maxFilter.index) {
                    index = maxFilter.index - 1
                }
                inputValue = values[index]
            } else {
                if (inputValue < min) {
                    inputValue = +min
                }
                if (inputValue >= maxFilter.value - filtersOffset) {
                    inputValue = +maxFilter.value - filtersOffset
                }
            }
            inputValue = parseFloat(inputValue).toFixed(2)
            setMinFilter(() => {
                return { value: inputValue, index: index }
            })
        }
    }

    const handleMaxFilter = (value, percent) => {
        if (value && !isNaN(value)) {
            let inputValue = +value
            let index = maxFilter.index
            if (values.length > 2) {
                index = getCloserIndexByPercent(percent, values)
                if (index <= minFilter.index) {
                    index = minFilter.index + 1
                }
                inputValue = values[index]
            } else {
                if (inputValue > max) {
                    inputValue = +max
                }
                if (inputValue <= +minFilter.value + filtersOffset) {
                    inputValue = +minFilter.value + filtersOffset
                }
            }

            inputValue = parseFloat(inputValue).toFixed(2)
            setMaxFilter(() => {
                return { value: inputValue, index: index }
            })
        }
    }

    const handleIsModifying = modifying => {
        setIsModifying(modifying)
    }

    return (
        <div className="range-container">
            <Input
                value={minFilter.value}
                readonly={values.length > 2}
                onChange={ handleMinFilter}
                onModify={handleIsModifying}
                ariaLabel='Minimum filter price input'
            />
            <div className="range-slider">
                <span className="range-bar" />
                <Bullet
                    value={minFilter.value}
                    values={values}
                    onChange={handleMinFilter}
                    onModify={handleIsModifying}
                    limit={maxFilter}
                    filtersOffset={filtersOffset}
                    ariaLabel='Minimum filter price slider'
                />
                <Bullet
                    isMax
                    value={maxFilter.value}
                    values={values}
                    onChange={handleMaxFilter}
                    onModify={handleIsModifying}
                    limit={minFilter}
                    filtersOffset={filtersOffset}
                    ariaLabel='Maximun filter price slider'
                />
            </div>
            <Input
                value={maxFilter.value}
                readonly={values.length > 2}
                onChange={ handleMaxFilter}
                onModify={handleIsModifying}
                ariaLabel='Maximun filter price input'
            />
        </div>
    )
}

export default Range
