import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Button,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import OrderPanel from './../components/OrderPanel'
import { GetOrdersApi } from './../Api'

const propTypes = {
  actions: PropTypes.object,
  orders: PropTypes.object.isRequired
}
const contextTypes = {
  routes: PropTypes.object.isRequired
}
class EmptyOrder extends Component {
  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text>您还未下过订单哦！</Text>
      </View>
    )
  }
}
class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
    }
  }
  componentDidMount() {
     this.timer = setTimeout(() => {
         this.onRefresh()
     }, 0)
  }
  componentWillUnmount() {
      clearTimeout(this.timer)
  }
  onRefresh() {
    if(!this.props.user.isLogin) {
      ToastAndroid.show('请先登录哦！', ToastAndroid.SHORT)
      return
    }
    this.setState({isRefreshing: true})
    GetOrdersApi().then(response => response.json())
    .then(responseJson => {
      if(!responseJson.errno) {
        this.props.actions.setOrderData(responseJson.data.orderData)
        this.setState({
          isRefreshing: false
        })
      } else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
    }).catch(error => {
      this.setState({
        isRefreshing: false
      })
      ToastAndroid.show('请检查网络链接哦', ToastAndroid.SHORT)
    })
  }
  onPress(orderItem, arrIndex) {
    Actions.orderDetail({arrIndex})
  }
  render() {
    let OrdersView = this.props.orders.orderData&&this.props.orders.orderData.length>0 ? this.props.orders.orderData.map((val, i) => {
      return (
        <TouchableOpacity activeOpacity={0.9} onPress={()=>this.onPress(val, i)} key={i}>
          <OrderPanel flightInfo={val} />
        </TouchableOpacity>
      )
    }) : <EmptyOrder></EmptyOrder>
    return(
      <ScrollView style={{backgroundColor: 'rgb(233,236,241)'}}
        refreshControl = {
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => this.onRefresh()}
            tintColor='#ff0000'
            title='Loading'
            titleColor='#00ff00'
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#fff" />
          }
        >
        { OrdersView }
      </ScrollView>
    )
  }
}
export default Orders
