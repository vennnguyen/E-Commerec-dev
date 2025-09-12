import axios from 'axios'

// config
import { CONFIG_API } from 'src/configs/api'
import instanceAxios from 'src/helper/axios'
//type
import { TLoginAuth } from 'src/types/auth/auth'

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
