import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Button,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Dimensions
} from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import OrderPanel from './../components/OrderPanel'
import PayModal from './../components/PayModal'
import Icon from 'react-native-vector-icons/Ionicons'
import { PayOrderApi } from './../Api'

const windowWidth = Dimensions.get('window').width
class Passengers extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const passengersView = this.props.passengers.map((val, i) => {
      return (
        <View style={styles.passenger} key={i}>
          <View style={styles.name}>
            <View style={styles.label}>
              <Text>姓名：</Text>
            </View>
            <View style={styles.value}>
              <Text>{ val.name }</Text>
            </View>
          </View>
          <View style={styles.identity}>
            <View style={styles.label}>
              <Text>身份证：</Text>
            </View>
            <View style={styles.value}>
              <Text>{ val.identity }</Text>
            </View>
          </View>
        </View>

      )
    })
    return (
      <View style={styles.panel}>
        <View style={styles.panel_head}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <View style={{
              width: 20
            }}>
              <Icon
                name='ios-person-outline'
                color='#666'
                size={22}
              />
            </View>
            <View style={{flex:1}}>
              <Text style={styles.person}>乘客信息</Text>
            </View>
          </View>
        </View>
        <View style={styles.panel_body}>
          { passengersView }
        </View>
      </View>
    )
  }
}

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.arrIndex = this.props.arrIndex
    this.state = {
      isShowPayModal: false,
    }
  }
  toPayOrder() {
    this.setState({
      isShowPayModal: true,
    })
  }
  payOrder(pwd) {
    PayOrderApi({ ...this.props.orders.orderData[this.arrIndex],
      payPwd: pwd
    }).then(response => response.json())
    .then(responseJson => {
      if(!responseJson.errno) {
        //支付成功
        this.props.actions.updateOrderData(responseJson.data.orderItem, this.arrIndex)
        this.props.actions.delAccount(responseJson.data.orderItem.price.toString())
        this.setState({
          isShowPayModal: false
        })
        ToastAndroid.show('支付成功', ToastAndroid.SHORT)
      } else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
    }).catch(error => {
      ToastAndroid.show('请检查网络链接哦', ToastAndroid.SHORT)
    })
  }
  closePayModal() {
    this.setState({
      isShowPayModal: false
    })
  }
  toBack() {
    Actions.pop()
  }
  render() {
    let bottomBtn = this.props.orders.orderData[this.arrIndex].orderStatus == '未支付' ?
      (
        <Button
          color="red"
          title="去支付"
          onPress={() => this.toPayOrder(this.props.orders.orderData[this.arrIndex])}
        />
      ) : (
        <Button
          color="#61aefd"
          title="返回"
          onPress={() => this.toBack()}
          />
      )
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <OrderPanel flightInfo={this.props.orders.orderData[this.arrIndex]} ></OrderPanel>
          <Passengers passengers={this.props.orders.orderData[this.arrIndex].passengers} />
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={styles.btnView}>
            { bottomBtn }
          </View>
        </View>
        <PayModal isShow={this.state.isShowPayModal}
          close={() => this.closePayModal()}
          payFunc={(pwd) => this.payOrder(pwd)}
           />
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
  panel_head: {
    height: 45,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  person: {
    fontSize: 16,
  },
  panel_body: {
    // marginTop: 10
  },
  passenger: {
    backgroundColor: '#fff',
    height: 88,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  name: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  identity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgb(233,236,241)'
  },
  label: {
    flex: 1,
    alignItems: 'center'
  },
  value: {
    flex: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  btnView: {
    width: windowWidth * 0.8,
    marginHorizontal: windowWidth*0.1
  }
})
export default OrderDetail
