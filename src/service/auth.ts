import axios from 'axios'

// config
import { CONFIG_API } from 'src/configs/api'
import instanceAxios from 'src/helper/axios'
//type
import { TLoginAuth, TRegisterAuth } from 'src/types/auth/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/login`, data)
    return res.data
  } catch (error) {
    return null
  }
}
export const logoutAuth = async () => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/logout`)
    return res.data
  } catch (error) {
    return null
  }
}
export const registerAuth = async (data: TRegisterAuth) => {
  try {
    // console.log('data', data)

    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/register`, data)

    return res.data
  } catch (error: any) {
    console.error('error', error)

    return {
      typeError: 'Internal Server Error',
      data: null,
      status: 'Error',
      message: error?.response?.data?.message
    }
  }
}
