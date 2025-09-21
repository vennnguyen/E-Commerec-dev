//react
import * as React from 'react'
//next
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
//config
import themeConfig from 'src/configs/themeConfig'

type TProps = {
  children: React.ReactNode
}

// TODO remove, this demo shouldn't need to reset the theme.
const theme = themeConfig
const UserLayout: NextPage<TProps> = ({ children }) => {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <HorizontalLayout open={open} toggleDrawer={toggleDrawer} />
        <VerticalLayout open={open} toggleDrawer={toggleDrawer} />

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
export default UserLayout
