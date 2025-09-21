//react
import { useContext } from 'react'
//context
import { AuthContext } from 'src/contexts/AuthContext'

export const useAuth = () => useContext(AuthContext)
