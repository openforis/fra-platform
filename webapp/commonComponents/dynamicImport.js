import React, { useState, useEffect } from 'react'
import { injectReducers } from '../state/store'

const DynamicImport = props => {
  const { module: _module, load, ...rest } = props
  const [component, setComponent] = useState(null)

  useEffect(() => {
    const init = async () => {
      const module = await load()
      const { component, reducers } = module
      if (reducers) {
        reducers.forEach(reducer => {
          injectReducers(reducer.name, reducer.fn)
        })
      }

      setComponent(
        component ? component : module.default,
      )
    }
    // Needed to run async function inside of useEffect
    init()

  }, [])

  return component ? React.createElement(component, rest) : null
}

export default DynamicImport
