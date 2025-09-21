//redux
import { createAsyncThunk } from '@reduxjs/toolkit'

//service
import { registerAuth, updateAuthMe } from 'src/service/auth'

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
