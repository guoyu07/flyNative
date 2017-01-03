import MyStorage from './init'

export default UserStorage = {
    save: (userInfo) => {
        MyStorage.save({
            key: 'user',
            rawData: userInfo,
            //如果不指定过期时间，则会使用defaultExpires参数
            //如果设为null，则永不过期
            expires: null
        })
    },

    /**
     * 获取storage里user数据 Promise
     * @return {[type]} [description]
     */
    load: () => {
        return MyStorage.load({
            'key': 'user',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: false,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        })
    },

    remove: () => {
        MyStorage.save({
            key: 'user',
            rawData: {
                isLogin: false,
                loginOrSignup: 'login'
            },
            expires: null
        })
    }
}
