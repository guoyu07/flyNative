import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Wallet from './../pages/Wallet'
import * as actionsCreators from './../store/actions'

class WalletContainer extends Component {
  render() {
    return (
      <Wallet {...this.props} />
    )
  }
}
const mapStateToProps = (state) => {
  const { user } = state
  return {
    user
  }
}
const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(actionsCreators, dispatch)
  return {
    actions
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer)
