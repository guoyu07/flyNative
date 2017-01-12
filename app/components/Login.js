import React, {Component} from 'react'
import {  Text, View, Image,  Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  handleLogin() {
    this.props.onLogin(this.state)
  }
  render() {
    return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <View style={{
            width: 300
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
              <Image style={{width: 200, height: 100}}
                source={require('./../img/tc.png')}
                />
            </View>
            <View style={{
              flex: 1
            }}>
              <TextInput
                style={{height: 40, marginTop: 20}}
                placeholder="账号"
                onChangeText={(email) => this.setState({email})}
                />
              <TextInput
                style={{height: 40, marginTop: 10}}
                placeholder="密码"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                />
            </View>
            <View style={{
              flex: 1,
              marginTop: 40
            }}>
              <Button
                color="#ff5346"
                style={{
                  marginTop: 50,
                  paddingTop: 20
                }}
                onPress={() => this.handleLogin()}
                title="登录">
              </Button>
              <TouchableOpacity onPress={()=>this.props.toSignup()}>
                <Text style={{textAlign: 'right', lineHeight: 30, color: '#3e9ce9'}}>
                  还没账号？快去注册吧
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingLeft: 20
  },
  itemText: {
    marginLeft: 10
  }
})
