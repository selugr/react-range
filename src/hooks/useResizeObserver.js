import { useRef, useEffect, useState } from 'react'

const useResizeObserver = refToObserve => {
    const [refWidth, setRefWidth] = useState( 0 )

    const observer = useRef(
        new ResizeObserver( entries => {
            const { width } = entries[0].contentRect
            setRefWidth( width )
        } )
    )

    useEffect( () => {
        if ( refToObserve.current ) {
            observer.current.observe( refToObserve.current )
        }

        return () => {
            observer.current.unobserve( refToObserve.current )
        }
    }, [observer] )

    return refWidth
}

export default useResizeObserver
