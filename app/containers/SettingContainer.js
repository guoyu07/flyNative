import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Setting from './../pages/Setting'
import * as actionsCreators from './../store/actions'

class SettingContainer extends Component {
  render() {
    return (
      <Setting {...this.props} />
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
export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer)
