import React, { useState, useEffect } from 'react'
import { injectReducers } from '@webapp/main/store'

import Loading from '@webapp/components/loading'

type Props = {
  load: (...args: any[]) => any
}

const DynamicImport = (props: Props) => {
  const { load } = props
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    ;(async () => {
      const module = await load()
      const { component, reducers } = module
      if (reducers) {
        reducers.forEach((reducer: any) => {
          injectReducers(reducer.name, reducer.fn)
        })
      }

      setComponent(component || module.default)
    })()
  }, [])

  return Component ? React.createElement(Component) : <Loading />
}

export default DynamicImport
