import * as types from './action-types'
export const toLogin = () => {
  return {
    type: types.TO_LOGIN
  }
}
export const toSignup = () => {
  return {
    type: types.TO_SIGNUP
  }
}
export const login = (userInfo) => {
  return {
    type: types.LOGIN_SUCCESS,
    userInfo
  }
}

export const signup = () => {
  return {
    type: types.SIGN_UP
  }
}
export const logout = () => {
  return {
    type: types.LOGOUT
  }
}

export const addAccount = (money) => {
  return {
    type: types.ADD_ACCOUNT,
    money
  }
}

export const searchFlight = (searchFlightForm) => {
  return {
    type: types.SET_SEARCH_FLIGHT_FORM,
    searchFlightForm
  }
}

export const updateOrderData = (orderItem, index) => {
  return {
    type: types.UPDATE_ORDER_DATA,
    orderItem,
    index
  }
}
export const addOrderData = (orderData) => {
  return {
    type: types.ADD_ORDER_DATA,
    orderData
  }
}
export const setOrderData = (orderData) => {
  return {
    type: types.SET_ORDER_DATA,
    orderData
  }
}
export const setFlightData = (flightData) => {
  return {
    type: types.SET_FLIGHT_DATA,
    flightData
  }
}
export const addFlightData = (flightData) => {
  return {
    type: types.ADD_FLIGHT_DATA,
    flightData
  }
}
