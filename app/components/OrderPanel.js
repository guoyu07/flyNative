import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class OrderPanel extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const orderStatusView = this.props.flightInfo.orderStatus ?
      (
        <View style={styles.panel_foot}>
           <Text style={styles.orderStatus}> {this.props.flightInfo.orderStatus} </Text>
        </View>
      ) : null
    return (
      <View style={this.props.flightInfo.orderStatus ? styles.panel : styles.minPanel}>
        <View style={styles.panel_head}>
          <Text style={styles.head_text}>
          {this.props.flightInfo.flightDay + '  ' + this.props.flightInfo.flightNo}
          </Text>
        </View>
        <View style={styles.panel_body}>
          <View style={styles.flight_info}>
            <Text style={styles.city}>{this.props.flightInfo.originCity}</Text>
            <Text style={styles.city}>{this.props.flightInfo.flightDate}</Text>
          </View>
          <View style={styles.flight_info}>
            <Icon
              color='#dcdcdc'
              name='ios-plane-outline'
              size={25}
            />
          <Text style={styles.price}> ￥{this.props.flightInfo.price} </Text>
          </View>
          <View style={styles.flight_info}>
            <Text style={styles.city}>{ this.props.flightInfo.destinationCity }</Text>
            <Text style={styles.city}>{ this.props.flightInfo.arrivalDate }</Text>
          </View>
        </View>
        { orderStatusView }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  minPanel: {
    margin: 10,
    minHeight: 100,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  panel: {
    margin: 10,
    minHeight: 140,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  panel_head: {
    backgroundColor: '#61aefd',
    height: 30,
    padding: 5,
    borderRadius: 5
  },
  head_text:{
    color: '#fff',
    fontSize: 14,
    textAlign: 'center'
  },
  price: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red'
  },
  panel_body:{
    padding: 5,
    margin: 5,
    flex: 1,
    minHeight: 60,
    flexDirection: 'row'
  },
  flight_info: {
    flex: 1,
    alignItems: 'center',
  },
  city: {
    fontSize: 18,
    color: '#333'
  },
  panel_foot: {
    marginHorizontal: 10,
    minHeight: 30,
    padding: 5,
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  orderStatus: {
    fontSize: 16,
    color: '#61aefd',
    textAlign: 'center'
  }
})
