// react
import { ReactNode, ReactElement } from 'react'
//type
import { useAuth } from 'src/hooks/useAuth'

interface NoGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}
const NoGuard = (props: NoGuardProps) => {
  //props
  const { children, fallback } = props
  const auth = useAuth()
  if (auth.loading) return fallback
  return <>{children}</>
}
export default NoGuard
