import React, {Component, PropTypes} from 'react'
import { View, Text, Button, StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import Login from './../components/Login'
import Signup from './../components/Signup'
import {LoginApi,SignupApi} from './../Api'
import { Actions } from 'react-native-router-flux'
import UserStorage from './../storage/User'

const propTypes = {
  actions: PropTypes.object,
  user: PropTypes.object.isRequired
}
const contextTypes = {
  routes: PropTypes.object.isRequired
}

export default class LoginOrReg extends Component {
  constructor(props) {
    super(props)
    this.actions = this.props.actions
  }
  onLogin(userInfo) {
    let that = this
    LoginApi(userInfo)
    .then((response) => response.json())
    .then(responseJson => {
      if(!responseJson.errno) {
        UserStorage.save(responseJson.data)
        that.actions.login(responseJson.data)
        Actions.pop()
      } else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
    })
    .catch(error => {
      ToastAndroid.show('请检查网络链接哦', ToastAndroid.SHORT)
    })
  }
  onSignup(userInfo) {
    SignupApi(userInfo)
    .then((response) => response.json())
    .then(responseJson => {
      if(!responseJson.errno) {
        this.actions.signup()
        ToastAndroid.show('注册成功，请前往登录', ToastAndroid.SHORT)
      }
      else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
    }).catch(error => {
      ToastAndroid.show('请检查网络链接哦', ToastAndroid.SHORT)
    })
  }
  toLogin() {
    this.actions.toLogin()
  }
  toSignup() {
    this.actions.toSignup()
  }
  render() {
    const showLoginOrSignupView = this.props.user.loginOrSignup === 'signup' ?
          (<Signup onSignup={(text)=>this.onSignup(text)} toLogin={()=>this.toLogin()}/>) :
          (<Login onLogin={(text)=>this.onLogin(text)} toSignup={()=>this.toSignup()}/>)
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        {showLoginOrSignupView}
      </ScrollView>
    )
  }
}
