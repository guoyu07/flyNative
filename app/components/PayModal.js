import React, { Component } from 'react'
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'


const {height:windowHeight, width: windowWidth} = Dimensions.get('window')
class PayModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
  }
  onPressBtn(key) {
    if(key == 'back') {
      this.setState({
        password: this.state.password.slice(0, -1)
      })
      return
    } else {
      this.setState({
        password: this.state.password.concat(key)
      })
    }
    setTimeout(() => {
      if(this.state.password.length == 6) {
        this.props.payFunc(this.state.password)
        this.setState({
          password: ''
        })
      }
    }, 0)

  }
  forgetPwd() {
    this.props.close()
    setTimeout(function() {
      Actions.setting()
    }, 0)
  }
  render() {
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isShow}
        onRequestClose={() => this.props.close()}
        >
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.headWrapper}>
              <View style={styles.head}>
                <Icon
                  name="ios-close"
                  onPress={() => this.props.close()}
                  size={30}>
                </Icon>
                <Text style={styles.headText}>输入密码</Text>
                <Text></Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.input}>
                <View style={styles.inputWrapper}>
                  <View style={styles.oneWord}>
                    {
                      this.state.password.length > 0 ? <View style={styles.inputText}></View> : null
                    }
                  </View>
                  <View style={styles.oneWord}>
                    {
                      this.state.password.length > 1 ? <View style={styles.inputText}></View> : null
                    }
                  </View>
                  <View style={styles.oneWord}>
                    {
                      this.state.password.length > 2 ? <View style={styles.inputText}></View> : null
                    }
                  </View>
                  <View style={styles.oneWord}>
                    {
                      this.state.password.length > 3 ? <View style={styles.inputText}></View> : null
                    }
                  </View>
                  <View style={styles.oneWord}>
                    {
                      this.state.password.length > 4 ? <View style={styles.inputText}></View> : null
                    }
                  </View>
                  <View style={[styles.oneWord, styles.lastWord]}>
                    {
                      this.state.password.length > 5 ? <View style={styles.inputText}></View> : null
                    }
                  </View>
                </View>
              </View>
              <View style={styles.forgetPwd}>
                <View style={{
                    width: 80
                  }}>
                  <Text style={styles.forgetPwdText} onPress={() => this.forgetPwd()}>忘记密码？</Text>
                </View>
              </View>
            </View>
            <View style={styles.keyboard}>
              <View style={styles.keyboardWrapper}>
                <View style={styles.keyrow}>
                  <TouchableOpacity style={styles.key} onPress={()=>this.onPressBtn('1')}>
                    <Text style={styles.keyText}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.key, styles.centerKey]} onPress={()=>this.onPressBtn('2')}>
                    <Text style={styles.keyText}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.key} onPress={()=>this.onPressBtn('3')}>
                    <Text style={styles.keyText}>3</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.keyrow}>
                  <TouchableOpacity style={styles.key} onPress={()=>this.onPressBtn('4')}>
                    <Text style={styles.keyText}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.key, styles.centerKey]} onPress={()=>this.onPressBtn('5')}>
                    <Text style={styles.keyText}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.key} onPress={()=>this.onPressBtn('6')}>
                    <Text style={styles.keyText}>6</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.keyrow}>
                  <TouchableOpacity style={styles.key} onPress={()=>this.onPressBtn('7')}>
                    <Text style={styles.keyText}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.key, styles.centerKey]} onPress={()=>this.onPressBtn('8')}>
                    <Text style={styles.keyText}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.key} onPress={()=>this.onPressBtn('9')}>
                    <Text style={styles.keyText}>9</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.keyrow}>
                  <View style={[styles.key, styles.emptyKey]}>

                  </View>
                  <TouchableOpacity style={[styles.key, styles.centerKey]} onPress={()=>this.onPressBtn('0')}>
                    <Text style={styles.keyText}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.key, styles.emptyKey]} activeOpacity={0.9} onPress={()=>this.onPressBtn('back')}>
                    <Icon
                      name="ios-backspace"
                      color="#fff"
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end'
  },
  content: {
    backgroundColor: 'rgb(242, 245, 246)',
    height: windowHeight * 0.64,
  },
  headWrapper: {
    height: windowHeight * 0.074,
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    borderColor: '#ccc',
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headText: {
    fontSize: 18,
    color: '#000'
  },
  body: {
    height: windowHeight * 0.23,
  },
  input: {
    margin: 20,
    height: windowHeight * 0.074,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  oneWord: {
    flex: 1,
    borderRightWidth: 0.5,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lastWord: {
    borderRightWidth: 0
  },
  inputText: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 5
  },
  forgetPwd: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  forgetPwdText: {
    color: '#3e9ce9',
    textAlign: 'right'
  },
  keyboard: {
    height: windowHeight * 0.336,
    backgroundColor: '#fff'
  },
  keyboardWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  keyrow: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  key: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  keyText: {
    fontSize: 20,
    color: '#000'
  },
  centerKey: {
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderColor: '#ccc'
  },
  emptyKey: {
    backgroundColor: 'rgb(227, 231, 238)'
  }
})
export default PayModal
