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
  componentWillMount() {

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
