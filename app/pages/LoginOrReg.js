import React, {Component, PropTypes} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ToastAndroid
} from 'react-native'
import Login from './../components/Login'
import Signup from './../components/Signup'
import {LoginApi,SignupApi} from './../Api'
import { Actions } from 'react-native-router-flux'

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
        that.actions.login(responseJson.data)
        Actions.pop()
      }
    })
    .catch(error => {
      console.log(error)
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
