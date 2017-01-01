import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from './../pages/Home'
import * as actionsCreators from './../store/actions'

class HomeContainer extends Component {
  render() {
    return (
      <Home {...this.props} />
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
