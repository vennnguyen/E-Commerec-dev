//react
import * as React from 'react'
//next
import { NextPage } from 'next'
//MUI
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
//Layout
import HorizontalLayout from './HorizontalLayout'
//theme
import { useTheme } from '@mui/material'

interface TProps {
  children: React.ReactNode
}

// TODO remove, this demo shouldn't need to reset the theme.
// const theme = useTheme()
const LayoutNotApp: NextPage<TProps> = ({ children }) => {
  // const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  return (
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
        <Container
          sx={{
            m: 4,
            width: 'calc(100vw - 32px)',
            maxWidth: 'unset !important',
            overflow: 'auto',
            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
            padding: '0 !important',
            borderRadius: '15px'
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}
export default LayoutNotApp
