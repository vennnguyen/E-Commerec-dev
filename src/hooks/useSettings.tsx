//react
import { useContext } from 'react'
//context
import { SettingsContext, SettingsContextValue } from 'src/contexts/SettingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
