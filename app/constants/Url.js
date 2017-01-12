/**
*  定义url
**/
const PORT = 8360

const rootUrl =  'http://10.6.94.140' + ':' + PORT

export const Login = rootUrl + '/login'
export const Logout = rootUrl + '/logout'
export const Signup = rootUrl + '/signup'
export const RechargePay = rootUrl + '/user/recharge'
export const ModifyPwd = rootUrl + '/user/modifyPwd'
export const ModifyPayPwd = rootUrl + '/user/modifyPayPwd'
export const ModifyName = rootUrl + '/user/modifyName'
export const Feedback = rootUrl + '/feedback'
export const GetOrders = rootUrl + '/orders/getOrders'
export const SubmitOrder = rootUrl + '/orders/submit'
export const PayOrder = rootUrl + '/orders/pay'
export const SearchFlight = rootUrl + '/flight/search'
