import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { removeUserData } from 'src/helper/storage'
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const authContext = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    const accessToken = window.localStorage.getItem('accessToken')
    const refreshToken = window.localStorage.getItem('refreshToken')

    if (!authContext.user && (!accessToken || !refreshToken)) {
      // Không có token thì đá về login
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/login')
      }
      authContext.setUser(null)
      removeUserData()
    }
  }, [router.isReady, router.asPath, authContext.user])

  if (authContext.loading) return fallback

  return <>{authContext.user ? children : fallback}</>
}

export default AuthGuard
