import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Orders from './../pages/Orders'
import * as actionsCreators from './../store/actions'

class OrdersContainer extends Component {
  render() {
    return (
      <Orders {...this.props} />
    )
  }
}
const mapStateToProps = (state) => {
  const { orders } = state
  return {
    orders
  }
}
const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(actionsCreators, dispatch)
  return {
    actions
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)
