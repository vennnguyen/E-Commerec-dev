import * as React from 'react'
import { NextPage } from 'next'
//MUI
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Box from '@mui/material/Box'

import Toolbar from '@mui/material/Toolbar'

import Container from '@mui/material/Container'
//Layout

import HorizontalLayout from './HorizontalLayout'
import VerticalLayout from './VerticalLayout'
import themeConfig from 'src/configs/themeConfig'

interface TProps {
  children: React.ReactNode
}

// TODO remove, this demo shouldn't need to reset the theme.
const theme = themeConfig
const LayoutNotApp: NextPage<TProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <HorizontalLayout open={false} toggleDrawer={() => {}} isHideMenu={false} />
        <Box
          component='main'
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
export default LayoutNotApp
