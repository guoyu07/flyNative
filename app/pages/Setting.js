import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ModifyPwdApi, ModifyPayPwdApi, ModifyNameApi } from './../Api'
class SetPwd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pwd: '',
      newPwd: ''
    }
  }
  render() {
    return this.props.isShow ? (
      <View style={{
          margin: 20,
          marginBottom: 0
        }}>
        <TextInput
          placeholder="请输入原密码"
          secureTextEntry={true}
          onChangeText={(pwd)=>this.setState({pwd})}
        />
        <TextInput
          placeholder="请输入新密码"
          secureTextEntry={true}
          onChangeText={(newPwd)=>this.setState({newPwd})}
        />
        <View style={{
            marginTop: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <View style={{
              width: 80
            }}>
            <Button
              title="取消"
              onPress={() => this.props.hide()}
              />
          </View>
          <View style={{
              width: 80
            }}>
            <Button
              title="确定"
              color='red'
              onPress={() => this.props.sure(this.state)}>
            </Button>
          </View>
        </View>
      </View>
    ) : null
  }
}
class SetPayPwd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      payPwd: '',
      newPayPwd: ''
    }
  }
  render() {
    return this.props.isShow ? (
      <View style={{
          margin: 20,
          marginBottom: 0
        }}>
        <TextInput
          placeholder="请输入原支付密码"
          secureTextEntry={true}
          onChangeText={(payPwd)=>this.setState({payPwd})}
        />
        <TextInput
          placeholder="请输入新支付密码"
          secureTextEntry={true}
          onChangeText={(newPayPwd)=>this.setState({newPayPwd})}
        />
        <View style={{
            marginTop: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <View style={{
              width: 80
            }}>
            <Button
              title="取消"
              onPress={() => this.props.hide()}
              />
          </View>
          <View style={{
              width: 80
            }}>
            <Button
              title="确定"
              color='red'
              onPress={() => this.props.sure(this.state)}>
            </Button>
          </View>
        </View>
      </View>
    ) : null
  }
}
class SetName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }
  render() {
    return this.props.isShow ? (
      <View style={{
          margin: 20,
          marginBottom: 0
        }}>
        <TextInput
          placeholder="请输入新用户名"
          onChangeText={(username)=>this.setState({username})}
        />
        <View style={{
            marginTop: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <View style={{
              width: 80
            }}>
            <Button
              title="取消"
              onPress={() => this.props.hide()}
              />
          </View>
          <View style={{
              width: 80
            }}>
            <Button
              title="确定"
              color='red'
              onPress={() => this.props.sure(this.state)}>
            </Button>
          </View>
        </View>
      </View>
    ) : null
  }
}
class Setting extends Component {
  constructor(props) {
    super(props)
    this.actions = this.props.actions
    this.state = {
      showSetPwd: false,
      showSetPayPwd: false,
      showSetName: false,
    }
  }
  showOne(key) {
    let newState = {}
    for(item in this.state) {
      newState[item] = item == key ? (!this.state[key]) : false
    }
    this.setState(newState)
  }
  setPwd(obj) {
    for(item in obj) {
      if(!obj[item]) {
        ToastAndroid.show('请检查输入', ToastAndroid.SHORT)
        return
      }
    }
    ModifyPwdApi(obj).then(response => response.json())
    .then(responseJson => {
      if(!responseJson.errono) {
        this.setState({
          showSetPwd: false
        })
        ToastAndroid.show('密码修改成功', ToastAndroid.SHORT)
      }
      else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    })

  }
  setPayPwd(obj) {
    for(item in obj) {
      if(!obj[item]) {
        ToastAndroid.show('请检查输入', ToastAndroid.SHORT)
        return
      }
    }
    ModifyPayPwdApi(obj).then(response => response.json())
    .then(responseJson => {
      if(!responseJson.errono) {
        this.setState({
          showSetPayPwd: false
        })
        ToastAndroid.show('支付密码修改成功', ToastAndroid.SHORT)
      }
      else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    })
  }
  setName(obj) {
    //检查参数是否为空
    for(item in obj) {
      if(!obj[item]) {
        ToastAndroid.show('请输入新用户名', ToastAndroid.SHORT)
        return
      }
    }
    ModifyNameApi(obj).then(response => response.json())
    .then(responseJson => {
      if(!responseJson.errono) {
        this.setState({
          showSetName: false
        })
        ToastAndroid.show('用户名修改成功', ToastAndroid.SHORT)
      }
      else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    })
  }
  hideSetName() {
    this.setState({
      showSetName: false
    })
  }
  hideSetPayPwd() {
    this.setState({
      showSetPayPwd: false
    })
  }
  hideSetPwd() {
    this.setState({
      showSetPwd: false
    })
  }
  render() {
    return(
      <ScrollView style={{backgroundColor: 'rgb(233,236,241)'}}>
        <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={()=>this.showOne('showSetPwd')}>
          <Icon
            color='#999'
            name='ios-key-outline'
            size={25}
          />
          <Text style={styles.itemText}>修改登录密码</Text>
        </TouchableOpacity>

        <SetPwd isShow={this.state.showSetPwd}
          hide={()=> this.hideSetPwd()}
          sure={(obj) => this.setPwd(obj)} />

        <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={() => this.showOne('showSetPayPwd')}>
          <Icon
            color='#999'
            name='ios-finger-print'
            size={25}
          />
          <Text style={styles.itemText}>修改支付密码</Text>
        </TouchableOpacity>

        <SetPayPwd isShow={this.state.showSetPayPwd}
          hide={()=> this.hideSetPayPwd()}
          sure={(obj) => this.setPayPwd(obj)} />

        <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={() => this.showOne('showSetName')}>
          <Icon
            color='#999'
            name='ios-happy-outline'
            size={25}
          />
          <Text style={styles.itemText}>修改用户名</Text>
        </TouchableOpacity>

        <SetName isShow={this.state.showSetName}
          hide={()=> this.hideSetName()}
          sure={(obj) => this.setName(obj)} />

        <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={() => {ToastAndroid.show('暂无更新', ToastAndroid.SHORT)}}>
          <Icon
            color='#999'
            name='ios-download-outline'
            size={25}
          />
          <Text style={styles.itemText}>检查更新</Text>
        </TouchableOpacity>

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
    height: 50,
    borderRadius: 10,
    backgroundColor: 'red'
  },
  quitText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  }
})
export default Setting
