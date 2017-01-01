import React, { Component } from 'react'
import {
  Text,
  View,
  ToastAndroid,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

export default class FlightItem extends Component {
  constructor(props) {
    super(props)
  }
  onFlightClick() {
    this.props.onFlightClick(this.props.data)
  }
  onBtnClick() {
    // ToastAndroid.show('请先登录', ToastAndroid.SHORT)
    Actions.makeOrder()
  }
  render() {
    const cabinDetail = this.props.data.cabins.map((val, i) => {
                          return <View style={styles.rowDetail} key={i.toString()}>
                                  <View style={{flex: 1}}>
                                    <Text style={styles.cabin}>{val.cabin}</Text>
                                    <Text style={styles.remain}>余{val.remain}张</Text>
                                  </View>
                                  <View>
                                    <Button
                                      color="#ff5346"
                                      title={val.price}
                                      onPress={() => this.onBtnClick()}>
                                    </Button>
                                  </View>
                                </View>
                        })
    return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.onFlightClick()} >
            <View style={styles.row}>
              <View style={styles.rowUp}>
                <View style={{flex: 1}}>
                  <Text style={[styles.text,styles.date]}>
                    {this.props.data.flightDate}
                  </Text>
                  <Text style={[styles.text,styles.city]}>
                    {this.props.data.originCity}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Icon
                    color='#dcdcdc'
                    name='ios-plane-outline'
                    size={40}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.text,styles.date]}>
                    { this.props.data.arrivalDate }
                  </Text>
                  <Text style={[styles.text,styles.city]}>
                    {this.props.data.destinationCity}
                  </Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.price}>
                    {this.props.data.price}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.tips}>
                  {this.props.data.tips}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          { this.props.data.isShowCabin ?
            <View>
              { cabinDetail }
            </View>
            : null
          }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: 'rgb(237,240,245)'
  },
  row: {
    marginTop: 5,
    padding: 15,
    height: 100,
    backgroundColor: '#fff',
  },
  rowUp: {
    height: 52,
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    color: '#333'
  },
  date: {
    fontSize: 20
  },
  city: {
    fontSize: 14
  },
  price: {
    color: '#ff5346',
    fontSize: 20,
    textAlign: 'right',
    lineHeight: 48
  },
  tips: {
    fontSize: 12,
    color: '#999'
  },
  cabin: {
    fontSize: 14,
    color: '#333'
  },
  remain: {
    fontSize: 12,
    color: '#666'
  },
  rowDetail: {
    height: 60,
    marginTop: 5,
    marginLeft: 8,
    marginRight: 8,
    paddingLeft: 7,
    paddingRight:7,
    paddingTop: 10,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row'
  }
})
