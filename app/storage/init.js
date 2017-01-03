import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

let storage = storage ||  new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    //数据过期时间，默认一整天（1000 * 3600 * 24 ms ），设为null 则永不过期
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    // sync: require('./sync')
})
export default storage
