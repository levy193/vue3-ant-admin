import Cookies from 'js-cookie'

const TokenKey = 'AccessToken'
const AppIdKey = 'AppId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAppId() {
  return Cookies.get(AppIdKey)
}

export function setAppId(appId) {
  return Cookies.set(AppIdKey, appId)
}

export function removeAppId() {
  return Cookies.remove(AppIdKey)
}
