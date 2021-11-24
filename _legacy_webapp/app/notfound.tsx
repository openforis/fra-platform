import React from 'react'
import { Link } from 'react-router-dom'

import * as BasePaths from '../main/basePaths'

const Notfound = () => {
  return (
    <div className="notfound">
      <img src="/img/tucan.svg" alt="tucan" />
      <p className="subhead">
        <strong>Page not found</strong>
      </p>
      <Link to={BasePaths.root}>Back to main page</Link>
    </div>
  )
}
export default Notfound
