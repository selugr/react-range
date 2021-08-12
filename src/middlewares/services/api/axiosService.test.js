import axiosService from './axiosService'

it('Fetches continuous values', async () => {
    const result = [1, 100]
    const data = await axiosService.getContinuousValues()
    expect(data).toEqual(result)
})

it('Fetches staggered values', async () => {
    const result = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
    const data = await axiosService.getStaggeredValues()
    expect(data).toEqual(result)
})