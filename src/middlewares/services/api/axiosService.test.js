import axios from 'axios'
import axiosService from './axiosService'
jest.mock( 'axios' )

describe( 'fetching continuous values', () => {
    it( 'fetches successfully data', async () => {
        const data = {
            min: 2,
            max: 10
        }

        const result = [2, 10]

        axios.get.mockImplementationOnce( () => Promise.resolve( { data: data } ) )
        await expect( axiosService.getContinuousValues() ).resolves.toEqual( result )
    } )
    it( 'fetches erroneously data', async () => {
        axios.get.mockImplementationOnce( () => Promise.reject( new Error() ) )
        await expect( axiosService.getContinuousValues() ).resolves.toEqual( [] )
    } )
} )

describe( 'fetching staggered values', () => {
    it( 'fetches successfully data', async () => {
        const data = {
            values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
        }

        const result = data.values

        axios.get.mockImplementationOnce( () => Promise.resolve( { data: data } ) )
        await expect( axiosService.getStaggeredValues() ).resolves.toEqual( result )
    } )
    it( 'fetches erroneously data', async () => {
        axios.get.mockImplementationOnce( () => Promise.reject( new Error() ) )
        await expect( axiosService.getStaggeredValues() ).resolves.toEqual( [] )
    } )
} )
