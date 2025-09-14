//lib
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
//config
import { BASE_URL, CONFIG_API } from 'src/configs/api'
//storage
import { getUserData, removeUserData } from '../storage'

//next
import { NextRouter, useRouter } from 'next/router'
//react
import React, { FC } from 'react'
//types
import { UserDataType } from 'src/contexts/types'
//hooks
import { useAuth } from 'src/hooks/useAuth'

const instanceAxios = axios.create({
  baseURL: BASE_URL
})
type TAxiosInterceptors = {
  children: React.ReactNode
}
const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/') {
    router.replace({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    })
  } else {
    router.replace('/login')
  }
  setUser(null)
  removeUserData()
}
const AxiosInterceptors: FC<TAxiosInterceptors> = ({ children }) => {
  const router = useRouter()
  const { AccessToken, RefreshToken } = getUserData()
  const { setUser } = useAuth()
  instanceAxios.interceptors.request.use(async config => {
    if (AccessToken) {
      const decodedAccessToken: any = jwtDecode(AccessToken)
      if (decodedAccessToken?.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${AccessToken}`
      } else {
        if (RefreshToken) {
          const decodedRefreshToken: any = jwtDecode(RefreshToken)
          if (decodedRefreshToken?.exp > Date.now() / 1000) {
            //call api tạo new access token
            await axios
              .post(
                `${CONFIG_API.AUTH.INDEX}/refresh-token`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${RefreshToken}`
                  }
                }
              )
              .then(res => {
                const NewAccessToken = res.data.data.access_token
                if (NewAccessToken) {
                  config.headers['Authorization'] = `Bearer ${AccessToken}`
                } else {
                  handleRedirectLogin(router, setUser)
                }
              })
              .catch(e => {
                handleRedirectLogin(router, setUser)
              })
          } else {
            handleRedirectLogin(router, setUser)
          }
        } else {
          handleRedirectLogin(router, setUser)
        }
      }
    } else {
      handleRedirectLogin(router, setUser)
    }
    return config
  })
  instanceAxios.interceptors.response.use(response => {
    return response
  })
  return <>{children}</>
}

export default instanceAxios
export { AxiosInterceptors }
