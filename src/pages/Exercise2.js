import { useState, useEffect } from 'react'
import Range from '../components/Range/Range'
import dataController from '../middlewares/dataController'
import './Exercise2.css'

const Exercise2 = () => {
    const [rangeValues, setRangeValues] = useState([])

    const [min, setMin] = useState()
    const [max, setMax] = useState()

    useEffect(() => {
        (async () => {
            setRangeValues(await dataController.getStaggeredValues())
        })()
    }, [])

    useEffect(() => {
        // You can manage your range state changes here. Console method is provided to ease checking process.
        // console.log('Exercise2 results: ', `Min: ${min} - Max:${max}`)
    }, [min, max])

    const handleMin = (min) => {
        setMin(min)
    }

    const handleMax = (max) => {
        setMax(max)
    }

    return (
        <section className="range-section-2">
            <Range
                rangeValues={rangeValues}
                onChangeMin={handleMin}
                onChangeMax={handleMax}
            />
        </section>
    )
}

export default Exercise2
