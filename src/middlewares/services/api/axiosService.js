import axios from 'axios'
import global from './index'

export default {
    getContinuousValues: async () => {
        const res = await axios.get(global.rangeAPI.url + global.rangeAPI.endPoints.continuous)
        const minMaxArray = [res.data.min, res.data.max]
        return minMaxArray || []
    },
    getStaggeredValues: async () => {
        const res = await axios.get(global.rangeAPI.url + global.rangeAPI.endPoints.staggered)
        return res.data.values || []
    }
}
