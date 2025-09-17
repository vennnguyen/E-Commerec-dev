import { createAsyncThunk } from '@reduxjs/toolkit'
import { log } from 'console'
//service
import { registerAuth } from 'src/service/auth'

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
