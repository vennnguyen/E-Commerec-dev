// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { AppAbility, buildAbilityFor, type ACLObj } from 'src/configs/acl'
import BlankLayout from 'src/view/layout/BlankLayout'
import NotAuthorized from 'src/pages/401'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { AbilityContext } from '../acl/Can'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props
  const auth = useAuth()
  const router = useRouter()
  let ability: AppAbility
  const permissionUser = auth.user?.role.permissions ?? []
  if (auth.user && !ability) {
    ability = buildAbilityFor(permissionUser, aclAbilities.subject)
  }
  //trang khôn khả dụng hoặc chưa đăng nhập
  if (guestGuard || router.route === '/500' || router.route === '/404' || !authGuard) {
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return <>{children}</>
    }
  }
  //check quyền khi đã đăng nhập
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }
  return (
    <>
      <BlankLayout>
        <NotAuthorized />
      </BlankLayout>
    </>
  )
}

export default AclGuard
