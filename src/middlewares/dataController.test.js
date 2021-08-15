import dataServices from './services/dataServices'
import dataController from './dataController'
jest.mock( './services/dataServices' )

describe( 'fetching continuous values from data services', () => {
    it( 'fetches successfully data', async () => {
        const data = [2, 10]

        dataServices.getContinuousValues.mockImplementationOnce( () => Promise.resolve( data ) )
        await expect( dataController.getContinuousValues() ).resolves.toEqual( data )
    } )
    it( 'fetches erroneously data', async () => {
        dataServices.getContinuousValues.mockImplementationOnce( () => Promise.reject( new Error() ) )
        await expect( dataController.getContinuousValues() ).resolves.toEqual( [] )
    } )
} )

describe( 'fetching staggered values from data services', () => {
    it( 'fetches successfully data', async () => {
        const data = [1.99, 5.99, 10.99]

        dataServices.getStaggeredValues.mockImplementationOnce( () => Promise.resolve( data ) )
        await expect( dataController.getStaggeredValues() ).resolves.toEqual( data )
    } )
    it( 'fetches erroneously data', async () => {
        dataServices.getStaggeredValues.mockImplementationOnce( () => Promise.reject( new Error() ) )
        await expect( dataController.getStaggeredValues() ).resolves.toEqual( [] )
    } )
} )
