import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import OrderDetail from './../pages/OrderDetail'
import * as actionsCreators from './../store/actions'

class OrderDetailContainer extends Component {
  render() {
    return (
      <OrderDetail {...this.props} />
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailContainer)
