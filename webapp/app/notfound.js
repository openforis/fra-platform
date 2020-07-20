import React from 'react'
import { Link } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import useCountryIso from '@webapp/components/hooks/useCountryIso'

const Notfound = () => {
  const countryIso = useCountryIso()

  return (
    <div className="notfound">
      <img src="/img/tucan.svg" alt="tucan" />
      <p className="subhead">
        <strong>Page not found</strong>
      </p>
      <Link to={BasePaths.getCountryHomeLink(countryIso)}>Back to main page</Link>
    </div>
  )
}
export default Notfound
