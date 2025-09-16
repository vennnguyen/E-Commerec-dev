import Typography from '@mui/material/Typography'
import BlankLayout from 'src/view/layout/BlankLayout'

const Error401 = () => {
  return (
    <Typography variant='h2' sx={{ mb: 1.5 }}>
      You are not authorized!
    </Typography>
  )
}

export default Error401
Error401.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
