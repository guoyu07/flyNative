import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  WebView,
  StyleSheet,
  ToastAndroid
} from 'react-native'
import { Actions } from 'react-native-router-flux'
class WebviewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: 'http://www.baidu.com'
    }
  }
  componentWillMount() {
    Actions.refresh({title: '关于我们'})
  }

  onError() {
    ToastAndroid.show('加载失败，请重试', ToastAndroid.SHORT)
  }
  render() {
    return (
      <WebView
        source = {{uri: this.state.uri}}
        onError = { () => this.onError() }
      />
    )
  }
}
const styles = StyleSheet.create({
  navBarTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
export default WebviewPage
