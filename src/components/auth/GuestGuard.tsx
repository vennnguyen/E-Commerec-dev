// ** Next Imports
import { useRouter } from 'next/router'
// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const authContext = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    if (window.localStorage.getItem('accessToken') && window.localStorage.getItem('refreshToken')) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (authContext.loading || (!authContext.loading && authContext.user !== null)) return fallback
  return <>{children}</>
}

export default GuestGuard
