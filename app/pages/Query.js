import React, {Component} from 'react'
import { StyleSheet, Text, Image, View, TextInput, DatePickerAndroid, TouchableOpacity,ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

class Query extends Component {
  constructor(props) {
    super(props)
    this.state={
      originCity: '',
      destinationCity: '',
      flightDay: '请选择起飞时间'
    }
  }
  searchFlight() {
    for(item in this.state) {
      if(item == 'flightDay' && this.state[item] == '请选择起飞时间') {
        ToastAndroid.show('请选择起飞时间', ToastAndroid.SHORT)
        return
      }
      if(!this.state[item]) {
        ToastAndroid.show('请完成信息输入', ToastAndroid.SHORT)
        return
      }
    }
    Actions.flights({
      searchFlightForm: this.state
    })
  }
  async pickDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          flightDay: `${year}-${month}-${day}`
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  render() {
    return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 50,
          backgroundColor: 'white'
        }}>
          <View style={{ width: 300 }}>
            <View style={{height: 100}}>
              <View style={{ flex:1, alignItems: 'center' }}>
                <Image style={{width: 200, height: 100}}
                  source={require('./../img/tc.png')}/>
              </View>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder='请输入出发地'
                placeholderTextColor="#ccc"
                underlineColorAndroid='transparent'
                onChangeText={(originCity) => this.setState({originCity})}
                />
              <TextInput
                style={styles.input}
                placeholder='请输入目的地'
                placeholderTextColor="#ccc"
                underlineColorAndroid='transparent'
                onChangeText={(destinationCity) => this.setState({destinationCity})}
                />
              <TouchableOpacity style={styles.date} activeOpacity={0.9} onPress={() => this.pickDate()}>
                <View style={styles.dateWrapper}>
                  <Text style={styles.dateText}>{this.state.flightDay}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.searchBtn} activeOpacity={0.9} onPress={() => this.searchFlight()}>
              <View style={styles.searchBtnWrapper}>
                <Text style={styles.searchBtnText}>查询</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 5,
    borderWidth: 0.8,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 5
  },
  date: {
    height: 40,
    marginVertical: 5,
    borderWidth: 0.8,
    borderColor: '#ccc',
    borderRadius: 5
  },
  dateWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  dateText: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  searchBtn: {
    marginTop: 20,
    backgroundColor: 'red',
    height: 50,
    borderRadius: 10,
  },
  searchBtnWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBtnText: {
    color: '#fff',
    fontSize: 20
  }
})
export default Query
