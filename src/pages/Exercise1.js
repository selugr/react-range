import { useState, useEffect } from 'react'
import Range from '../components/Range/Range'
import dataController from '../middlewares/dataController'
import './Exercise1.css'

const Exercise1 = () => {
    const [rangeValues, setRangeValues] = useState([])

    const [min, setMin] = useState()
    const [max, setMax] = useState()

    useEffect(() => {
        (async () => {
            setRangeValues(await dataController.getContinuousValues())
        })()
    }, [])

    useEffect(() => {
        // You can manage your range state changes here. Console method is provided to ease checking process.
        // console.log('Exercise1 results: ', `Min: ${min} - Max:${max}`)
    }, [min, max])

    const handleMin = (min) => {
        setMin(min)
    }

    const handleMax = (max) => {
        setMax(max)
    }

    return (
        <section className="range-section-1">
            <Range
                rangeValues={rangeValues}
                onChangeMin={handleMin}
                onChangeMax={handleMax}
                filtersOffset={5}
                updateOnEnd
            />
        </section>
    )
}

export default Exercise1
