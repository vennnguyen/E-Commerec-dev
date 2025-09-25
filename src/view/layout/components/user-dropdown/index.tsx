// ** React
import React from 'react'

// ** Next
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Mui Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Badge, Typography, styled } from '@mui/material'

// ** Components
import IconifyIcon from 'src/components/Icon'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Translate
import { useTranslation } from 'react-i18next'

// ** config
import { ROUTE } from 'src/configs/route'

// ** Utils
import { toFullName } from 'src/utils'

type TProps = {}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

const UserDropdown = (props: TProps) => {
  // ** Translation
  const { t, i18n } = useTranslation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const { user, logout } = useAuth()

  const open = Boolean(anchorEl)

  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigateMyProfile = () => {
    router.push(ROUTE.PROFILE)
    handleClose()
  }
  const handleNavigateChangePassword = () => {
    router.push(ROUTE.CHANGE_PASSWORD)
    handleClose()
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('Account')}>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.avatar ? (
                  <Image
                    src={user?.avatar || ''}
                    alt='avatar'
                    width={0}
                    height={0}
                    style={{
                      height: '32px',
                      width: '32px',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <IconifyIcon icon='ph:user-thin' />
                )}
              </Avatar>
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mx: 2, pb: 2, px: 2 }}>
          <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.avatar ? (
                <Image
                  src={user?.avatar || ''}
                  alt='avatar'
                  width={0}
                  height={0}
                  style={{
                    height: '32px',
                    width: '32px',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <IconifyIcon icon='ph:user-thin' />
              )}
            </Avatar>
          </StyledBadge>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component='span'>
              {toFullName(user?.lastName || '', user?.midName || '', user?.firstName || '', i18n.language)}
            </Typography>
            <Typography component='span'>{user?.role?.name}</Typography>
          </Box>
        </Box>
        <Divider />
        <MenuItem onClick={handleNavigateMyProfile}>
          <Avatar>
            <IconifyIcon icon='ph:user-thin' />
          </Avatar>{' '}
          {t('My Profile')}
        </MenuItem>
        <MenuItem onClick={handleNavigateChangePassword}>
          <Avatar sx={{ backgroundColor: 'transparent' }}>
            <IconifyIcon icon='hugeicons:reset-password' />
          </Avatar>
          {t('change_password')}
        </MenuItem>
        <MenuItem onClick={logout}>
          <Avatar sx={{ backgroundColor: 'transparent' }}>
            <IconifyIcon icon='material-symbols-light:logout' />
          </Avatar>
          {t('logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default UserDropdown
