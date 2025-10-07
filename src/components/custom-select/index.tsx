import { Box, InputLabel, InputLabelProps, MenuItem, MenuItemProps, Select, SelectProps } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'

type TCustomSelect = SelectProps & {
  options: { label: string; value: string }[]
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    padding: '4px 8px 8px 10px !important',
    height: '38px',
    boxSizing: 'border-box'
  },
  legend: {
    display: 'none'
  },
  "svg" : {
    top: "calc(50% - .6em) !important"
  },
  ".MuiOutlinedInput-notchedOutline": {
    top: "-4px !important",
    bottom: "2px !important"
  }
}))

const CustomPlaceHolder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  left: '10px',
  zIndex: 2
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}))

const CustomSelect = (props: TCustomSelect) => {
  const { value, label, onChange, fullWidth, placeholder, options, ...rest } = props
  const { t } = useTranslation()

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {((Array.isArray(value) && !value.length) || !value) && <CustomPlaceHolder>{placeholder}</CustomPlaceHolder>}
      <StyledSelect fullWidth={fullWidth} value={value} label={label} onChange={onChange} {...rest}>
        {options?.length > 0 ? (
          options?.map(opt => {
            return (
              <StyledMenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </StyledMenuItem>
            )
          })
        ) : (
          <StyledMenuItem>{t('no_data')}</StyledMenuItem>
        )}
      </StyledSelect>
    </Box>
  )
}

export default CustomSelect
