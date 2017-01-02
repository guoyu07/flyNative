import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MakeOrder from './../pages/MakeOrder'
import * as actionCreators from './../store/actions.js'

class MakeOrderContainer extends Component {
  render() {
    return (
      <MakeOrder {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, orders } = state
  return {
    user, orders
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    actions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeOrderContainer)
