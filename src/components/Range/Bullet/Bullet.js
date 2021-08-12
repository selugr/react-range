import { useState, useEffect, useRef } from 'react'
import {
    getCloserIndexByPercent,
    clamp,
    indexToPercent,
    valueToPercent,
    percentToValue
} from '../Utils/Utils'
import './Bullet.css'

const Bullet = (
    {
        isMax,
        value = 0,
        values = [],
        onChange,
        onModify,
        limit,
        filtersOffset = 1,
        ariaLabel
    }
) => {
    const bulletRef = useRef()
    const [positionPercent, setPositionPercent] = useState(isMax ? 100 : 0)
    const [mousePositionPercent, setMousePositionPercent] = useState(isMax ? 100 : 0)
    const [isDragging, setIsDragging] = useState(false)
    const [scale, setScale] = useState(1)
    const [bulletContainerWidth, setBulletContainerWidth] = useState(0)

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    const observer = useRef(
        new ResizeObserver(entries => {
            const { width } = entries[0].contentRect
            setBulletContainerWidth(width)
        })
    )

    useEffect(() => {
        if (bulletRef.current) {
            observer.current.observe(bulletRef.current)
        }

        return () => {
            observer.current.unobserve()
        }
    }, [observer])

    useEffect(() => {
        if (values && values.length >= 2 && values.every(v => !isNaN(v))) {
            setMin(parseFloat(values[0]).toFixed(2))
            setMax(parseFloat(values.slice(-1)).toFixed(2))
        }
    }, [values])

    useEffect(() => {
        onModify(isDragging)

        window.addEventListener('pointerup', handlePointerUp)
        window.addEventListener('pointermove', handlePointerMove)
        return () => {
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('pointermove', handlePointerMove)
        }
    }, [isDragging])

    useEffect(() => {
        if (!isDragging) {
            setPositionPercent(valueToPercent(value, min, max))
        }
    }, [value])

    useEffect(() => {
        if (isDragging) {
            onChange(percentToValue(positionPercent, min, max), positionPercent)
        }
    }, [positionPercent])

    useEffect(() => {
        if (isDragging) {
            let index = getCloserIndexByPercent(mousePositionPercent, values)
            if (isMax) {
                if (index <= limit.index) {
                    index = limit.index + 1
                }
            } else {
                if (index >= limit.index) {
                    index = limit.index - 1
                }
            }
            setPositionPercent(indexToPercent(index, values))
        }
    }, [mousePositionPercent])

    const handlePointerDown = (e) => {
        setIsDragging(true)
    }

    const handlePointerUp = () => {
        setIsDragging(false)
    }
    const handlePointerMove = (e) => {
        if (isDragging) {
            const movementX = (e.movementX * 100) / bulletContainerWidth
            if (values.length > 2) {
                setMousePositionPercent(p => p + movementX)
            } else {
                if (isMax) {
                    const percentLimit = parseFloat(valueToPercent(+limit.value + filtersOffset, min, max))
                    setPositionPercent(p => clamp(p + movementX, percentLimit, 100))
                } else {
                    const percentLimit = parseFloat(valueToPercent(+limit.value - filtersOffset, min, max))
                    setPositionPercent(p => clamp(p + movementX, 0, percentLimit))
                }
            }
        }
    }

    return (
        <div
            ref={bulletRef}
            className="bullet-container"
            style={
                {
                    left: `${positionPercent}%`
                }
            }
        >
            <span
                className="bullet"
                onPointerDown={ handlePointerDown }
                onMouseEnter={() => setScale(1.4)}
                onMouseLeave={() => setScale(1)}
                style={
                    {
                        '--bullet-scale': scale,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }
                }
                role='slider'
                aria-valuemin={isMax ? limit.value : values[0]}
                aria-valuemax={isMax ? values.slice(-1) : limit.value}
                aria-valuenow={value}
                aria-label={ariaLabel}
            />
        </div>
    )
}

export default Bullet
