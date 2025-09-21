//MUI
import { Icon, IconButton } from '@mui/material'
//component
import IconifyIcon from 'src/components/Icon'
//hooks
import { useSettings } from 'src/hooks/useSettings'
//types
import { Mode } from 'src/types/layouts'

type TProps = {}
const ModeToggle = (props: TProps) => {
  const { settings, saveSettings } = useSettings()
  const handleChangeMode = (mode: Mode) => {
    saveSettings({
      ...settings,
      mode
    })
  }
  return (
    <IconButton color='inherit' onClick={() => handleChangeMode(settings.mode === 'light' ? 'dark' : 'light')}>
      <IconifyIcon
        icon={
          settings.mode === 'light' ? 'material-symbols-light:dark-mode' : 'material-symbols-light:light-mode-outline'
        }
      />
    </IconButton>
  )
}

export default ModeToggle
