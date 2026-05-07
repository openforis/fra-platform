import React from 'react'
import Skeleton from 'react-loading-skeleton'

import Flex from 'client/components/Layout/Flex'

const RegisterSkeleton: React.FC = () => {
  return (
    <div className="data-grid form-grid">
      <Skeleton borderRadius="4px" height="48px" width="100%" />
      <Skeleton borderRadius="4px" height="48px" width="100%" />
      <Flex gap="16" justifyContent="center">
        <Skeleton borderRadius="20px" height="48px" width="380px" />
      </Flex>
    </div>
  )
}

export default RegisterSkeleton
