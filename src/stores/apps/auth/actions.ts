//redux
import { createAsyncThunk } from '@reduxjs/toolkit'

//service
import { registerAuth, updateAuthMe, changePasswordMe } from 'src/service/auth'
import { TChangePassword } from 'src/types/auth'



export const registerAuthAsync = createAsyncThunk('auth/register', async (data: any) => {
  const response = await registerAuth(data)
  console.log('response', response)

  if (response?.data) {
    return response
  } else {
    return {
      data: null,
      message: response?.message,

      typeError: response?.typeError
    }
  }
})
//update-auth-me
export const updateAuthMeAsync = createAsyncThunk('auth/update-me', async (data: any) => {
  const response = await updateAuthMe(data)
  console.log('response', response)

  if (response?.data) {
    return response
  } else {
    return {
      data: null,
      message: response?.message,

      typeError: response?.typeError
    }
  }
})
//change-password
export const changePasswordMeAsync = createAsyncThunk('auth/change-password-me', async (data: TChangePassword) => {
  const response = await changePasswordMe(data)

  if (response?.status === 'Success') {
    return { ...response, data: 1 }
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})