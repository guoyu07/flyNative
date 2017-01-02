import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Flights from './../pages/Flights'
import * as actionsCreators from './../store/actions'

class FlightsContainer extends Component {
  render() {
    return (
      <Flights {...this.props} />
    )
  }
}
const mapStateToProps = (state) => {
  const { flight } = state
  return {
    flight
  }
}
const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(actionsCreators, dispatch)
  return {
    actions
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlightsContainer)
