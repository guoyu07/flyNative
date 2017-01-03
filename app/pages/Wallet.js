import React, {Component} from 'react'
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { RechargeApi } from './../Api'
import PayModal from './../components/PayModal'

class Recharge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      money: ''
    }
  }
  setAccount() {
    this.setState({money: ''})
    this.props.addAccount(this.state.money)
  }

  render() {
    const rechargeView = this.props.isShow ?
      (
        <View style={styles.body}>
          <TextInput
            keyboardType="numeric"
            placeholder="请输入充值金额"
            value={this.state.money}
            onChangeText={(money) => this.setState({money})}
            />
            <View style={{marginTop: 20}}>
              <Button
                color="red"
                title="确认支付"
                onPress={() => this.setAccount()}
              />
            </View>
        </View>
      ) : null
    return (
       rechargeView
    )
  }
}
class Wallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toRecharge: false,
      showToRechargeBtn: true,
      money: '',
      isShowPayModal: false,
    }
  }

  addAccount(money) {

    if(!/(^\d+$)|(^\d+\.[0-9]{1,2}$)/.test(money)) {
      ToastAndroid.show('请输入合法的金额', ToastAndroid.SHORT)
      return
    }
    this.setState({money})
    // this.setState({showModal: true})
    this.setState({
      isShowPayModal: true
    })

  }
  surePay(payPwd) {
    let payInfo = {
      money: this.state.money,
      payPwd
    }
    RechargeApi(payInfo).then(response => {return response.json()})
    .then((responseJson) => {
      if(!responseJson.errno) {
        this.props.actions.addAccount(this.state.money)
        this.setState({
          showToRechargeBtn: true,
          toRecharge: false,
          isShowPayModal: false
        })
        ToastAndroid.show('充值成功', ToastAndroid.SHORT)
      } else {
        ToastAndroid.show('充值失败', ToastAndroid.SHORT)
      }
    })
    .catch(error => {
      ToastAndroid.show('请检查网络链接哦', ToastAndroid.SHORT)
    })
  }

  toPayOrder() {
    this.setState({
      isShowPayModal: true,
    })
  }

  closePayModal() {
    this.setState({
      isShowPayModal: false
    })
  }
  render() {
    const toRechargeBtn = this.state.showToRechargeBtn ?
      (
        <View style={styles.body}>
          <Button
            style={styles.button}
            width={200}
            title="立即充值"
            color="#3e9ce9"
            onPress={() => this.setState({toRecharge: true, showToRechargeBtn: false})}
          />
        </View>
      ) : null
    return (
      <ScrollView style={styles.containers}>
        <View style={styles.card}>
          <Text style={styles.accountLabel}>账户余额(元)</Text>
          <Text style={styles.account}>{this.props.user.account || '0.00'}</Text>
        </View>

        <Recharge isShow={this.state.toRecharge} addAccount={(money) => this.addAccount(money)}/>

        { toRechargeBtn }

        <PayModal isShow={this.state.isShowPayModal}
          close={() => this.closePayModal()}
          payFunc={(pwd) => this.surePay(pwd)}
             />
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  containers: {
    backgroundColor: 'rgb(233,236,241)'
  },
  card: {
    minHeight: 180,
    backgroundColor: '#3e9ce9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10
  },
  accountLabel: {
    color: '#fff',
    fontSize: 18
  },
  account: {
    color: '#fff',
    fontSize: 30
  },
  body: {
    margin: 20,
    minHeight: 200,
    borderRadius: 10
  },
  sureModal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalPanel: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    minHeight: 200,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalPanelHead: {
    marginVertical: 10
  },
  panelFooter: {
    width: 300,
    height: 60,
    marginTop: 20
  },
  modalBtns: {
    width: 100
  }
})
export default Wallet
