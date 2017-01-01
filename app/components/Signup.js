import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      repeatPwd: ''
    }
  }

  handleSignup() {
    this.props.onSignup(this.state)
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
                placeholder="请输入用户名"
                onChangeText={(username) => this.setState({username})}
                />
              <TextInput
                style={{height: 40, marginTop: 20}}
                placeholder="请输入邮箱"
                onChangeText={(email) => this.setState({email})}
                />
              <TextInput
                style={{height: 40, marginTop: 10}}
                placeholder="请输入密码"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                />
              <TextInput
                style={{height: 40, marginTop: 10}}
                placeholder="请再次输入密码"
                secureTextEntry={true}
                onChangeText={(repeatPwd) => this.setState({repeatPwd})}
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
                onPress={() => this.handleSignup()}
                title="注册">
              </Button>
              <Text style={{textAlign: 'right', lineHeight: 30, color: '#3e9ce9'}}
                onPress={()=>this.props.toLogin()}
              >
                已有账号？快去登录吧
              </Text>
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
