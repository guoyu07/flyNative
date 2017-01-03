import React, {Component, PropTypes} from 'react'
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Feedback from './../components/Feedback'
import { Actions } from 'react-native-router-flux'
import { FeedbackApi } from './../Api'
import UserStorage from './../storage/User'

const propTypes = {
  actions: PropTypes.object,
  user: PropTypes.object.isRequired
}
const contextTypes = {
  routes: PropTypes.object.isRequired
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.actions = this.props.actions
    this.state = {
      isShowFeedback: false
    }
  }
  toLogin() {
    if(this.props.user.isLogin) {
      return
    }
    Actions.loginOrReg()
  }
  onLogout() {
    UserStorage.remove()
    this.actions.logout()
    ToastAndroid.show('退出成功', ToastAndroid.SHORT)
  }
  toWallet() {
    Actions.wallet()
  }
  toWebView() {
    Actions.webview()
  }
  toSetting() {
    Actions.setting()
  }
  hideFeedback() {
    this.setState({
      isShowFeedback: false
    })
  }
  submitFeedback(text) {
    if(!text) {
      ToastAndroid.show("请填写您的建议", ToastAndroid.SHORT)
      return
    }
    FeedbackApi(text).then(response => response.json())
    .then(responseJson => {
      if(!responseJson.errno) {
        ToastAndroid.show("感谢您的反馈", ToastAndroid.SHORT)
        this.setState({
          isShowFeedback: false
        })
      }
      else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    const logoutView = this.props.user.isLogin ?
          (<TouchableOpacity onPress={() => this.onLogout()}>
             <View style={[styles.item, styles.quit]}>
               <Text style={styles.quitText}>退出</Text>
             </View>
           </TouchableOpacity>) : null
    return (
      <ScrollView style={{backgroundColor: 'rgb(233,236,241)'}}>
        <View style={styles.header}>
          <Icon
            color='#dcdcdc'
            name='ios-contact'
            size={100}
            onPress={() => this.toLogin()}
          />
        <Text style={{color: '#fff'}}>{ this.props.user.username || '未登录' }</Text>
        </View>
        <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={()=>this.toWallet()}>
          <Icon
            color='#999'
            name='md-card'
            size={25}
          />
          <Text style={styles.itemText}>我的钱包</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={() => this.toSetting()}>
          <Icon
            color='#999'
            name='ios-settings'
            size={25}
          />
          <Text style={styles.itemText}>设置</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={() => this.setState({isShowFeedback: true})}>
          <Icon
            color='#999'
            name='ios-chatboxes'
            size={25}
          />
          <Text style={styles.itemText}>反馈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={() => this.toWebView()}>
          <Icon
            color='#999'
            name='ios-people'
            size={25}
          />
          <Text style={styles.itemText}>关于我们</Text>
        </TouchableOpacity>

        { logoutView }
        <Feedback isShow={this.state.isShowFeedback}
          hide={() => this.hideFeedback()}
          submit={(text) => this.submitFeedback(text)} />
      </ScrollView>

    )
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3e9ce9',
    height: 180,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    height: 60,
    backgroundColor: '#fff',
    marginTop: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  itemText: {
    marginLeft: 10
  },
  quit: {
    justifyContent: 'center',
    margin: 20,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'red'
  },
  quitText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  }
})
export default Home
