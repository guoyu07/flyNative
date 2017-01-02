import * as Url from './constants/Url'
const Api = (url, info) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info)
  })
}
export const LoginApi = (userInfo) => Api(Url.Login, userInfo)

export const LogoutApi = (userInfo) => Api(Url.Logout, userInfo)

export const SignupApi = (userInfo) => Api(Url.Signup, userInfo)

export const RechargeApi = (payInfo) => Api(Url.RechargePay, payInfo)

export const ModifyPwdApi = (pwdInfo) => Api(Url.ModifyPwd, pwdInfo)

export const ModifyPayPwdApi = (pwdInfo) => Api(Url.ModifyPayPwd, pwdInfo)

export const ModifyNameApi = (userInfo) => Api(Url.ModifyName, userInfo)

export const FeedbackApi = (advice) => Api(Url.Feedback, advice)

export const GetOrdersApi = (userInfo) => Api(Url.GetOrders, userInfo)

export const PayOrderApi = (orderInfo) => Api(Url.PayOrder, orderInfo)

export const SubmitOrderApi = (orderInfo) => Api(Url.SubmitOrder, orderInfo)

export const SearchFlightApi = (flightForm) => Api(Url.SearchFlight, flightForm)
