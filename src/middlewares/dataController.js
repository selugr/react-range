import dataServices from './services/dataServices'

const getContinuousValues = async () => {
    const continuousValues = await dataServices.getContinuousValues()
    return continuousValues
}

const getStaggeredValues = async () => {
    const staggeredValues = await dataServices.getStaggeredValues()
    return staggeredValues
}

export default {
    getContinuousValues: getContinuousValues,
    getStaggeredValues: getStaggeredValues
}
