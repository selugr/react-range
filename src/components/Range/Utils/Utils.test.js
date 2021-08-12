import {
    getCloserIndexByPercent,
    clamp,
    indexToPercent,
    valueToPercent,
    percentToValue,
    validateNumber
} from './Utils'

describe('get closer index by percent', () => {
    const values = [56.99, 75, 150, 185.25, 350]

    it('percent of 0 returns index 0', () => {
        expect(getCloserIndexByPercent(0, values)).toBe(0)
    })
    it('percent of 24 returns index 0', () => {
        expect(getCloserIndexByPercent(20, values)).toBe(0)
    })
    it('percent of 25 returns 1', () => {
        expect(getCloserIndexByPercent(21, values)).toBe(1)
    })
    it('percent of 50 returns 2', () => {
        expect(getCloserIndexByPercent(41, values)).toBe(2)
    })
    it('percent of 75 returns 3', () => {
        expect(getCloserIndexByPercent(61, values)).toBe(3)
    })
    it('percent of 100 returns 4', () => {
        expect(getCloserIndexByPercent(81, values)).toBe(4)
    })
})

describe('clamp values between min and max', () => {
    const min = 0
    const max = 100

    it('value of 5 returns 5', () => {
        expect(clamp(5, min, max)).toBe(5)
    })
    it('value of -1 returns 0', () => {
        expect(clamp(-1, min, max)).toBe(0)
    })
    it('value of 100.5 returns 5', () => {
        expect(clamp(100.5, min, max)).toBe(100)
    })
})

describe('index to percent', () => {
    const values = [56.99, 75, 150, 185.25, 350]

    it('index of 0 returns 0', () => {
        expect(indexToPercent(0, values)).toBe(0)
    })
    it('index of 1 returns 25', () => {
        expect(indexToPercent(1, values)).toBe(25)
    })
    it('index of 2 returns 50', () => {
        expect(indexToPercent(2, values)).toBe(50)
    })
    it('index of 3 returns 75', () => {
        expect(indexToPercent(3, values)).toBe(75)
    })
    it('index of 4 returns 100', () => {
        expect(indexToPercent(4, values)).toBe(100)
    })
})

describe('value to percent', () => {
    const min = 56.66
    const max = 172.99

    it('value of 0 returns 0', () => {
        expect(valueToPercent(0, min, max)).toBe(0.00)
    })
    it('value of 300 returns 100', () => {
        expect(valueToPercent(300, min, max)).toBe(100.00)
    })
    it('value of 100 returns 37.26', () => {
        expect(valueToPercent(100, min, max)).toBe(37.26)
    })
})

describe('percent to value', () => {
    const min = 56.66
    const max = 172.99

    it('percent of 0 returns 56.66', () => {
        expect(percentToValue(0, min, max)).toBe(min)
    })
    it('percent of 50 returns 114.83', () => {
        expect(percentToValue(50, min, max)).toBe(114.83)
    })
    it('percent of 100 returns 172.99', () => {
        expect(percentToValue(100, min, max)).toBe(max)
    })
})

describe('validate number', () => {
    it('invalid input keeps its valid number parts', () => {
        expect(validateNumber('asdas5.5.a6..')).toBe('5.56')
    })
    it('input of 3 validates', () => {
        expect(validateNumber('3')).toBe('3')
    })
})
