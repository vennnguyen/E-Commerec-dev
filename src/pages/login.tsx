import { NextPage } from 'next'
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
