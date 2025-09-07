// ** Icon Imports
import { Icon, IconProps } from '@iconify/react'
import { InputLabel, TextField, TextFieldProps, InputLabelProps, styled } from '@mui/material'
import { lchown } from 'fs'
import { transform } from 'next/dist/build/swc'
import spacing from 'src/theme/spacing'

const TextFieldLabel = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputLabel-root': {
    transform: 'none',
    lineHeight: 1.2,
    position: 'relative',
    spacing: theme.spacing(1),
    fontSize: theme.typography.body2.fontSize
  },
  '& .MuiInputBase-root': {
    borderRadius: 8,
    backgroundColor: 'transparent !important',
    border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      duration: theme.transitions.duration.shorter
    }),
    '&:before, &:after': {
      display: 'none'
    },
    '.MuiInputBase-input': {
      padding: '8px 10px'
    }
  }
}))
const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', InputLabelProps, variant = 'filled', ...rest } = props

  return <TextField size={size} variant={variant} InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rest} />
}

export default CustomTextField
