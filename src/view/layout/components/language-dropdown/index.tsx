//React
import React from 'react'
//MUI
import { Box, IconButton, Menu, MenuItem, Popover, styled, Typography } from '@mui/material'
//component
import Icon from 'src/components/Icon'
//translate
import { useTranslation } from 'react-i18next'
//config
import { OPTION_LANGUAGES } from 'src/configs/i18n'

type TProps = {}

const LanguageDropDown = (props: TProps) => {
  //state
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  //hooks
  const { i18n } = useTranslation()
  const StyleItem = styled(Box)(({ theme }) => ({
    padding: '8px 16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  }))
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  console.log(i18n.language)

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    handleClose()
  }
  return (
    <>
      <IconButton onClick={handleClick} color='inherit' aria-describedby={id} id='lang'>
        <Icon icon='material-symbols:translate-rounded' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
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
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {OPTION_LANGUAGES.map(lang => {
          return (
            <MenuItem
              key={lang.value}
              onClick={() => changeLanguage(lang.value)}
              selected={lang.value === i18n.language}
            >
              <Typography>{lang.lang}</Typography>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default LanguageDropDown
