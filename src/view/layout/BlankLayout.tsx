import * as React from 'react'
// Next
import { NextPage } from 'next'
// MUI
import { Box, BoxProps, styled } from '@mui/material'

type TProps = {
  children: React.ReactNode
}
const BlankLayoutWapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh'
}))
const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <BlankLayoutWapper>
      <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>{children}</Box>
    </BlankLayoutWapper>
  )
}

export default BlankLayout
