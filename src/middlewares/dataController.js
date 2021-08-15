import dataServices from './services/dataServices'

const getContinuousValues = async () => {
    try {
        const continuousValues = await dataServices.getContinuousValues()
        return continuousValues
    } catch ( e ) {
        return []
    }
}

const getStaggeredValues = async () => {
    try {
        const staggeredValues = await dataServices.getStaggeredValues()
        return staggeredValues
    } catch ( e ) {
        return []
    }
}

export default {
    getContinuousValues: getContinuousValues,
    getStaggeredValues: getStaggeredValues
}
