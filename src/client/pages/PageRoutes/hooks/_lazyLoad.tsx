import React, { ComponentType, FC, Suspense } from 'react'

import Loading from 'client/components/Loading'

export const lazyLoad = (importFunction: () => Promise<{ default: ComponentType }>): FC => {
  const Component = React.lazy(importFunction)
  return () => (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}
