export const validateNumber = n => {
    return n.replace(/(?!\d+|(?<!\..*)\.)./g, '')
}

export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max)
}

export const getCloserIndexByPercent = (percent, values) => {
    let index = Math.floor((percent * values.length - 1) / 100)
    index = clamp(index, 0, values.length - 1)
    return index
}

export const indexToPercent = (index, values) => {
    return clamp((index * 100) / (values.length - 1), 0, 100)
}

export const valueToPercent = (value, minValue, maxValue) => {
    const clampedValue = clamp(((value - minValue) * 100) / (maxValue - minValue), 0, 100)
    return +parseFloat(clampedValue).toFixed(2)
}

export const percentToValue = (percent, minValue, maxValue) => {
    const value = +minValue + ((percent * (maxValue - minValue)) / 100)
    return +parseFloat(value).toFixed(2)
}
