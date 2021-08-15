import axios from 'axios'
import global from './index'

export default {
    getContinuousValues: async () => {
        const res = await axios
            .get( global.rangeAPI.url + global.rangeAPI.endPoints.continuous )
            .catch( error => error )
        if ( !res?.data?.min || !res?.data?.max ) { return [] }
        const minMaxArray = [res.data.min, res.data.max]
        return minMaxArray
    },
    getStaggeredValues: async () => {
        const res = await axios
            .get( global.rangeAPI.url + global.rangeAPI.endPoints.staggered )
            .catch( error => error )
        if ( !res?.data?.values ) { return [] }
        return res.data.values
    }
}
