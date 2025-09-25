// next
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { NextPage } from 'next'
//MUI
import { Checkbox, IconButton, InputAdornment, useTheme } from '@mui/material'
import { Button, CssBaseline, FormControlLabel, Typography, Box, Grid, TextField } from '@mui/material'

// validation
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

//regex
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
//components
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'
//image
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import FacebookSvg from '/public/svgs/facebooksvg.svg'
import GoogleSvg from '/public/svgs/googlesvg.svg'
//hooks
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
//translate
import { useTranslation } from 'react-i18next'

type TProps = {}
const LoginPage: NextPage<TProps> = () => {
  //state
  const [showPassword, setShowPassword] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  //context
  const { login } = useAuth()
  //theme
  const theme = useTheme()
  //translate
  const { t } = useTranslation()
  //form
  const schema = yup.object().shape({
    email: yup.string().required('This field is required').matches(EMAIL_REG, 'Email is not valid'),
    password: yup
      .string()
      .required('This field is required')
      .matches(PASSWORD_REG, 'Password is contain character, number and special character')
  })

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  //submit
  const onSubmit = (data: { email: string; password: string }) => {
    if (!Object.keys(errors).length) {
      login({ ...data, rememberMe: isRemember }, err => {
        if (err?.response?.data?.typeError === 'INVALID') {
          toast.error(t('the_email_or_password_is_incorrect'))
        }
      })
    }
  }
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        padding: '40px'
      }}
    >
      <Box
        display={{
          sm: 'flex',
          xs: 'none'
        }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.customColors.bodyBg,
          height: '100%',
          minWidth: '50vw'
        }}
      >
        <Image
          src={theme.palette.mode === 'light' ? LoginLight : LoginDark}
          alt='login-dark'
          style={{ width: 'auto', height: 'auto' }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography
            component='h1'
            variant='h5'
            onClick={() => {
              console.log('ok')
            }}
          >
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box mt={2} width='300px'>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    placeholder='abc@gmail.com'
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors?.email)}
                    // helperText={errors?.email?.message}
                  />
                )}
                name='email'
              />
              {errors.email && (
                <Typography sx={{ color: 'red', fontSize: '12px' }}>{errors?.email?.message}</Typography>
              )}
            </Box>

            <Box mt={2} width='300px'>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Password'
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder='•••••'
                    value={value}
                    error={Boolean(errors?.password)}
                    // helperText={errors?.password?.message}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                            {showPassword ? (
                              <IconifyIcon icon={'cuida:visibility-on-outline'} />
                            ) : (
                              <IconifyIcon icon={'cuida:visibility-off-outline'} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='password'
              />
              {errors.password && (
                <Typography sx={{ color: 'red', fontSize: '12px' }}>{errors?.password?.message}</Typography>
              )}
            </Box>
            <Box mt={2} display='flex' justifyContent='space-between' alignItems='center' width='300px'>
              <FormControlLabel
                control={
                  <Checkbox
                    value='remember'
                    color='primary'
                    checked={isRemember}
                    onChange={e => {
                      setIsRemember(e.target.checked)
                    }}
                  />
                }
                label='Remember me'
              />
              <Link href='#'>Forgot password?</Link>
            </Box>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#'>{"Don't have an account? "}</Link>
              </Grid>
              <Grid item>
                <Link
                  href='/register'
                  style={{
                    color: theme.palette.primary.main
                  }}
                >
                  {'Sign Up'}
                </Link>
              </Grid>
            </Grid>
            <Typography sx={{ mt: 2, textAlign: 'center' }} variant='body2'>
              Continue with
            </Typography>
            <Box display='flex' alignItems='center' mt={2} justifyContent='center'>
              <IconButton>
                <Image src={FacebookSvg} alt='facebook' style={{ width: '40px', height: '40px' }} />
              </IconButton>
              <Typography sx={{ mt: 2, textAlign: 'center' }} variant='body2'>
                Or
              </Typography>
              <IconButton>
                <Image src={GoogleSvg} alt='google' style={{ width: '40px', height: '40px' }} />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
export default LoginPage
