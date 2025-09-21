//config
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from 'src/configs/auth'

export const setUserData = (data: string, accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(USER_DATA, data),
      window.localStorage.setItem(ACCESS_TOKEN, accessToken),
      window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
}

export const getUserData = () => {
  if (typeof window !== 'undefined') {
    return {
      UserData: window.localStorage.getItem(USER_DATA),
      AccessToken: window.localStorage.getItem(ACCESS_TOKEN),
      RefreshToken: window.localStorage.getItem(REFRESH_TOKEN)
    }
  }
  return {
    UserData: '',
    AccessToken: '',
    RefreshToken: ''
  }
}

export const removeUserData = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(USER_DATA)
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
  }
}
