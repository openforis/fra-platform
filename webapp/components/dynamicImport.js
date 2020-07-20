import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectReducers } from '@webapp/main/store'

import Loading from '@webapp/components/loading'

const DynamicImport = (props) => {
  const { load } = props
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    ;(async () => {
      const module = await load()
      const { component, reducers } = module
      if (reducers) {
        reducers.forEach((reducer) => {
          injectReducers(reducer.name, reducer.fn)
        })
      }

      setComponent(component || module.default)
    })()
  }, [])

  return Component ? React.createElement(Component) : <Loading />
}

DynamicImport.propTypes = {
  load: PropTypes.func.isRequired,
}

export default DynamicImport
