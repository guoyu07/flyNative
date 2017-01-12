import React, { Component } from 'react'
import { Text, View, Button, ToastAndroid, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import OrderPanel from './../components/OrderPanel'
import AddPassenger from './../components/AddPassenger'
import { SubmitOrderApi } from './../Api'
import { Actions } from 'react-native-router-flux'

class MakeOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sumPrice: this.props.flightInfo.price,
      passengers: [{
        name: '',
        identity: ''
      }]
    }
  }
  submitOrder() {
    //先检查是否登陆
    if(!this.props.user.isLogin) {
      ToastAndroid.show('请先登录', ToastAndroid.SHORT)
      Actions.loginOrReg()
      return
    }
    //验证身份证号
    for(let i=0,len=this.state.passengers.length; i<len; i++) {
      if(!this.checkIdentity(i)) {
        return
      }
    }
    SubmitOrderApi({...this.props.flightInfo,
      passengers: this.state.passengers,
      sumPrice: this.state.sumPrice
    }).then(response => response.json())
    .then(responseJson => {
        if(!responseJson.errno) {
          this.props.actions.addOrderData(responseJson.data.orderInfo)
          ToastAndroid.show('提交成功，前往支付', ToastAndroid.SHORT)
          Actions.orderDetail({arrIndex:this.props.orders.orderData.length - 1, type: 'replace'})
        }
        else {
          ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
        }
    }).catch(error => {
      ToastAndroid.show('请检查网络连接哦', ToastAndroid.SHORT)
    })

  }
  onChangeName(name, i) {
    let passengers = JSON.parse(JSON.stringify(this.state.passengers))
    passengers[i].name = name
    this.setState({passengers})
  }
  onChangeIdentity(identity, i) {
    let passengers = JSON.parse(JSON.stringify(this.state.passengers))
    passengers[i].identity = identity
    this.setState({passengers})
  }
  checkIdentity(i) {
    let identity = this.state.passengers[i].identity
    if(identity.length != 18) {
      ToastAndroid.show('身份证号填写错误', ToastAndroid.SHORT)
  		return false
  	}
  	else if(!/^[0-9]{17}[0-9X]$/.test(identity)) {
      ToastAndroid.show('身份证号填写错误', ToastAndroid.SHORT)
  		return false
  	}
    return true
  }
  addPassenger() {
    let passengers = JSON.parse(JSON.stringify(this.state.passengers))
    passengers.push({
      name: '',
      identity: ''
    })
    this.setState({passengers,
      sumPrice: this.props.flightInfo.price * passengers.length
    })
  }
  deletePassenger(i) {
    let passengers = JSON.parse(JSON.stringify(this.state.passengers))
    if(passengers.length < 2) {
      return
    }
    passengers.splice(i, 1)
    this.setState({passengers,
      sumPrice: this.props.flightInfo.price * passengers.length
    })
  }
  render() {
    return(
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <OrderPanel flightInfo={this.props.flightInfo}/>
          <AddPassenger passengers={this.state.passengers}
            addPassenger={() => this.addPassenger()}
            deletePassenger={(i) => this.deletePassenger(i)}
            onChangeName={(name, i) => this.onChangeName(name, i)}
            checkIdentity={(i) => this.checkIdentity(i)}
            onChangeIdentity={(identity, i) => this.onChangeIdentity(identity, i)}
            />
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={{
            width: 240,
          }}>
            <Text>订单总额：<Text style={{color: '#ff5346'}}>￥{this.state.sumPrice}</Text></Text>
          </View>
          <View style={{
            width: 120,
          }}>
            <Button title="提交订单" color="#fe932b" onPress={() => this.submitOrder()}></Button>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: 'rgb(233,236,241)',
    overflow: 'scroll',
    flex:1,
    marginBottom: 50
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  }
})
export default MakeOrder
