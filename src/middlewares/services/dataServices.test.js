import axiosService from './api/axiosService'
import dataServices from './dataServices'
jest.mock( './api/axiosService' )

describe( 'fetching data from axios service', () => {
    const errorMessage = 'error'

    it( 'fetches continuous data', async () => {
        const data = [2, 10]

        axiosService.getContinuousValues.mockImplementationOnce( () => Promise.resolve( data ) )
        await expect( dataServices.getContinuousValues() ).resolves.toEqual( data )
    } )
    it( 'fetches continuous erroneously data', async () => {
        axiosService.getContinuousValues.mockImplementationOnce( () => Promise.reject( new Error( errorMessage ) ) )
        await expect( axiosService.getContinuousValues() ).rejects.toThrow( errorMessage )
    } )
    it( 'fetches staggered data', async () => {
        const data = [1.99, 5.99, 10.99]

        axiosService.getStaggeredValues.mockImplementationOnce( () => Promise.resolve( data ) )
        await expect( dataServices.getStaggeredValues() ).resolves.toEqual( data )
    } )
    it( 'fetches staggered erroneously data', async () => {
        axiosService.getStaggeredValues.mockImplementationOnce( () => Promise.reject( new Error( errorMessage ) ) )
        await expect( axiosService.getStaggeredValues() ).rejects.toThrow( errorMessage )
    } )
} )
