//Next
import { NextPage } from 'next'
import LayoutNotApp from 'src/view/layout/LayoutNotApp'

//

import MyProfilePage from 'src/view/pages/my-profile'

type TProps = {}
const MyProfile: NextPage<TProps> = () => {
  return (
    <div>
      <MyProfilePage />
    </div>
  )
}
export default MyProfile
MyProfile.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
