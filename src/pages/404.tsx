// *MUI

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
//view
import BlankLayout from 'src/view/layout/BlankLayout'

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Typography variant='h2' sx={{ mb: 1.5 }}>
        Page Not Found
      </Typography>
    </Box>
  )
}

export default Error404
Error404.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
