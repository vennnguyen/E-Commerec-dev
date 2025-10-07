//Next
import { NextPage } from 'next'



import LayoutNotApp from 'src/view/layout/LayoutNotApp'
import ChangePasswordPage from 'src/view/pages/change-password'

type TProps = {}
const ChangePassword: NextPage<TProps> = () => {
  return (
    <div>
      <ChangePasswordPage />
    </div>
  )
}
export default ChangePassword
ChangePassword.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
