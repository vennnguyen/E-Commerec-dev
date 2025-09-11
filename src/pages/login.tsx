import { NextPage } from 'next'
import BlankLayout from 'src/view/layout/BlankLayout'
import LoginPage from 'src/view/pages/login'
type TProps = {}
const Login: NextPage<TProps> = () => {
  return (
    <div>
      <LoginPage />
    </div>
  )
}
export default Login
Login.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true
