# flyNative
  1. npm install

## 运行android（连上模拟器或者真机）
  1. react-native start
  2. react-native run-android

## 开启mock服务器
  1. 先配置app/constants/Url.js 中rootUrl为当前电脑ip地址，确保和手机或模拟器在同一局域网
  2. npm run server 开启mock数据
