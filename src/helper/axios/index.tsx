import axios from 'axios'
import { config } from 'process'
import { BASE_URL } from 'src/configs/api'
import { getUserData } from '../storage'
import { jwtDecode } from 'jwt-decode'

const instanceAxios = axios.create({
  baseURL: BASE_URL
})
instanceAxios.interceptors.request.use(config => {
  const { AccessToken, RefreshToken } = getUserData()

  if (AccessToken) {
    const decodedAccessToken: any = jwtDecode(AccessToken)
    if (decodedAccessToken.exp < Date.now() / 1000) {
      config.headers.Authorization = `Bearer ${AccessToken}`
    } else {
      if (RefreshToken) {
        const decodedRefreshToken: any = jwtDecode(RefreshToken)
        if (decodedRefreshToken.exp < Date.now() / 1000) {
          //call api tạo new access token
        } else {
        }
      }
    }
  }
  return config
})
instanceAxios.interceptors.response.use(response => {
  return response
})
export default instanceAxios
