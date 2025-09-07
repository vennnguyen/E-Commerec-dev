/**
 *  Set Home URL based on User Roles
 */
// phân quyền
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl'
  else return '/dashboards/analytics'
}

export default getHomeRoute
