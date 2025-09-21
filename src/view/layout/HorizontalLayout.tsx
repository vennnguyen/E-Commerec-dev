//react
import * as React from 'react'
//next
import { useRouter } from 'next/router'
import { NextPage } from 'next'
//MUI
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Button } from '@mui/material'
//component
import IconifyIcon from 'src/components/Icon'
import ModeToggle from './components/mode-toggle'
import LanguageDropDown from './components/language-dropdown'
//view
import UserDropDown from 'src/view/layout/components/user-dropdown'
//hooks
import { useAuth } from 'src/hooks/useAuth'
//config
import { ROUTE } from 'src/configs/route'

const drawerWidth: number = 240
type TProps = {
  open: boolean
  toggleDrawer: () => void
  isHideMenu?: boolean
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor:
    theme.palette.primary.main === 'light'
      ? theme.palette.customColors.lightPaperBg
      : theme.palette.customColors.darkPaperBg,
  color: theme.palette.primary.main,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
  const { user } = useAuth()
  const router = useRouter()
  return (
    <AppBar position='absolute' open={open} sx={{ backgroundColor: 'transparent', paddingTop: '4px' }}>
      <Toolbar
        sx={{
          pr: '30px', // keep right padding when drawer closed
          margin: '0 20px'
        }}
      >
        {isHideMenu && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              padding: '10px',
              ...(open && { display: 'none' })
            }}
          >
            {/* <MenuIcon /> */}
            <IconifyIcon icon='ic:round-menu' />
          </IconButton>
        )}

        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <LanguageDropDown />
        <ModeToggle />
        {user ? (
          <UserDropDown />
        ) : (
          <Button
            type='submit'
            variant='contained'
            sx={{ width: 'auto', ml: 2 }}
            onClick={() => {
              router.push(`${ROUTE.LOGIN}`)
            }}
          >
            Sign In
          </Button>
        )}
        {/* <IconButton color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <IconifyIcon icon='ic:round-notifications' />
          </Badge>
        </IconButton> */}
      </Toolbar>
    </AppBar>
  )
}
export default HorizontalLayout
