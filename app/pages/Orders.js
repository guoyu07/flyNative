import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Button,
  RefreshControl,
  ScrollView,
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
class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
    }
  }
  componentWillMount() {
    this.props.actions.setOrderData([{
      flightNo: 'MU5102',
      flightDay: '2016-12-28',
      flightDate: '10:00',
      arrivalDate: '12:20',
      originCity: '北京',
      destinationCity: '上海',
      price: '￥340',
      orderStatus: '未支付',
      passengers: [{
        name: '成龙',
        identity: '123456789987654321'
      },{
        name: '哈哈哈',
        identity: '123456789987654321'
      }]
    }])
  }
  onRefresh() {
    this.setState({isRefreshing: true})
    GetOrdersApi().then(response => response.json())
    .then(responseJson => {
      if(!responseJson.errno) {
        this.props.actions.addOrderData(responseJson.data.orderData)
        this.setState({
          isRefreshing: false
        })
      }
    })
  }
  onPress(orderItem, arrIndex) {
    Actions.orderDetail({arrIndex})
  }
  render() {
    let OrdersView = this.props.orders.orderData ? this.props.orders.orderData.map((val, i) => {
      return (
        <TouchableOpacity activeOpacity={0.9} onPress={()=>this.onPress(val, i)} key={i}>
          <OrderPanel flightInfo={val} />
        </TouchableOpacity>
      )
    }) : null
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
