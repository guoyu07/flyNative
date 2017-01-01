import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginOrReg from './../pages/LoginOrReg'
import * as actionCreators from './../store/actions.js'

class LoginContainer extends Component {
  render() {
    return (
      <LoginOrReg {...this.props} />
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
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    actions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
