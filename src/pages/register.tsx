//Next
import { NextPage } from 'next'

//
import BlankLayout from 'src/view/layout/BlankLayout'
import RegisterPage from 'src/view/pages/register'
type TProps = {}
const Register: NextPage<TProps> = () => {
  return (
    <div>
      <RegisterPage />
    </div>
  )
}
export default Register
Register.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
