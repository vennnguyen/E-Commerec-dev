import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from 'src/configs/auth'

export const setUserData = (data: string, accessToken: string, refreshToken: string) => {
  return {
    UserData: window.localStorage.setItem(USER_DATA, data),
    AccessToken: window.localStorage.setItem(ACCESS_TOKEN, accessToken),
    RefreshToken: window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
}

export const getUserData = () => {
  return {
    UserData: window.localStorage.getItem(USER_DATA),
    AccessToken: window.localStorage.getItem(ACCESS_TOKEN),
    RefreshToken: window.localStorage.getItem(REFRESH_TOKEN)
  }
}

export const removeUserData = () => {
  window.localStorage.removeItem(USER_DATA)
  window.localStorage.removeItem(ACCESS_TOKEN)
  window.localStorage.removeItem(REFRESH_TOKEN)
}
