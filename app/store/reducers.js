import { ActionConst, Actions } from 'react-native-router-flux'
import * as types from './action-types'

const initialState = {
  scene: {},
  user: {
    isLogin: false,
    loginOrSignup: 'login',
    username: '',
    email: '',
    mobile: '',
    account: 0.00,
  },
  flight: {
    flightData: []
  },
  orders: {
    orderData: []
  }
}

let reducers = {
  scene(state = initialState.scene, action = {}) {
    switch (action.type) {
      case ActionConst.FOCUS:
        return Object.assign({}, state, {
          scene: action.scene
        })
      default:
        return state
    }
  },
  flight(state = initialState.flight, action) {
    switch (action.type) {
      case types.SET_FLIGHT_DATA:
        return {...state,
          flightData: action.flightData
        }
      case types.ADD_FLIGHT_DATA:
        return { ...state,
          flightData: state.flightData.concat(action.flightData)
        }
      default:
        return state
    }
  },
  orders(state = initialState.orders, action) {
    switch (action.type) {
      case types.UPDATE_ORDER_DATA:
        state.orderData.splice(action.index, 1, action.orderItem)
        return {
          orderData: state.orderData
        }
      case types.SET_ORDER_DATA:
        return {
          orderData: action.orderData
        }
      case types.ADD_ORDER_DATA:
        return {
          orderData: state.orderData.concat(action.orderData)
        }
      default:
          return state
    }
  },
  user(state = initialState.user, action) {
    switch (action.type) {
      case types.TO_LOGIN:
        return {
          loginOrSignup: 'login'
        }
      case types.TO_SIGNUP:
        return {
          loginOrSignup: 'signup'
        }
      case types.SIGN_UP:
        return {
          loginOrSignup: 'login'
        }
      case types.LOGIN_SUCCESS:
        return {...action.userInfo,
          isLogin: true,
          account: parseFloat(action.userInfo.account)
        }
      case types.LOGOUT:
        return {
          isLogin: false
        }
      case types.SET_NAME: {
        return {
          ...state,
          username: action.username
        }
      }
      case types.ADD_ACCOUNT:
        return {...state,
          account: state.account + parseFloat(action.money)
        }
      case types.DEL_ACCOUNT:
        return {...state,
          account: state.account - parseFloat(action.money)
        }
      default:
        return state
    }
  }
}
module.exports = reducers
