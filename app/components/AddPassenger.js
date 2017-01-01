import React, {Component} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class AddPassenger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passengers: [{
        name: '',
        identity: ''
      }]
    }
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
  addPassenger() {
    let passengers = JSON.parse(JSON.stringify(this.state.passengers))
    passengers.push({
      name: '',
      identity: ''
    })
    this.setState({passengers})
  }
  deletePassenger(i) {
    let passengers = JSON.parse(JSON.stringify(this.state.passengers))
    if(passengers.length < 2) {
      return
    }
    passengers.splice(i, 1)
    this.setState({passengers})
  }
  render() {
    let passengersView = this.state.passengers.map((val, i) => {
        return (
          <View style={styles.passenger} key={i}>
            <View style={{
              width: 18,
              alignSelf: 'center'
            }}>
              <TouchableOpacity onPress={() => this.deletePassenger(i)}>
                <Icon
                  name="ios-remove-circle-outline"
                  color="#ff5346"
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <View style={styles.name}>
                <View style={styles.label}>
                  <Text style={styles.labelText}>姓名</Text>
                </View>
                <View style={styles.textInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="请输入乘客姓名"
                    placeholderTextColor="#999"
                    value={val.name}
                    onChangeText={(name)=>this.onChangeName(name, i)}
                  />
                </View>
              </View>
              <View style={styles.name}>
                <View style={styles.label}>
                  <Text style={styles.labelText}>身份证</Text>
                </View>
                <View style={styles.textInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="请输入证件号"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={val.identity}
                    onChangeText={(identity)=>this.onChangeIdentity(identity, i)}
                  />
                </View>
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
            <View style={{flex: 2}}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => this.addPassenger()}>
                <Text style={[styles.person, styles.add_color]}>+ 添加乘客</Text>
              </TouchableOpacity>
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

const styles = StyleSheet.create({
  panel: {
    // minHeight: 250
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
  add_color: {
    color: '#50b400',
    textAlign: 'right'
  },
  panel_body: {
    // marginTop: 10
  },
  passenger: {
    backgroundColor: '#fff',
    height: 88,
    marginBottom: 10,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    width: 50
  },
  labelText: {
    textAlign: 'center'
  },
  textInput: {
    flex: 3
  },
  input: {
    color: '#333'
  }
})
