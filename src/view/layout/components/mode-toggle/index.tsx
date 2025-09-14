import { Icon, IconButton } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { useSettings } from 'src/hooks/useSettings'
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
