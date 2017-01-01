import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import OrderPanel from './../components/OrderPanel'
import AddPassenger from './../components/AddPassenger'

class MakeOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flightInfo: {
        flightNo: 'MU5105',
        flightDay: '2016-12-28',
        flightDate: '10:00',
        arrivalDate: '12:20',
        originCity: '北京',
        destinationCity: '上海',
        price: '￥2340'
      }
    }
  }
  submitOrder() {
    ToastAndroid.show('请先登录', ToastAndroid.SHORT)
  }
  render() {
    return(
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <OrderPanel flightInfo={this.state.flightInfo}/>
          <AddPassenger />
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={{
            width: 240,
          }}>
            <Text>订单总额：<Text style={{color: '#ff5346'}}>￥5000</Text></Text>
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
