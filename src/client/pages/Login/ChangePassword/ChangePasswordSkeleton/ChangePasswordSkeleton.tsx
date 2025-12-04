import './ChangePasswordSkeleton.scss'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

import Flex from 'client/components/Layout/Flex'

const ChangePasswordSkeleton: React.FC = () => {
  return (
    <div className="change-password-skeleton">
      <Skeleton borderRadius="4px" height="48px" width="100%" />
      <Skeleton borderRadius="4px" height="48px" width="100%" />
      <Skeleton borderRadius="4px" height="48px" width="100%" />
      <Flex gap="16" justifyContent="center">
        <Skeleton borderRadius="20px" height="48px" width="190px" />
        <Skeleton borderRadius="20px" height="48px" width="190px" />
      </Flex>
    </div>
  )
}

export default ChangePasswordSkeleton
