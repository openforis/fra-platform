import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as AppState from './appState'

const Notfound = () => {
  const countryIso = useSelector(AppState.getCountryIso)

  return (
    <div className="notfound">
      <img src="/img/tucan.svg" alt="tucan" />
      <p className="subhead"><strong>Page not found</strong></p>
      <Link to={`/country/${countryIso}/`}>
        Back to main page
      </Link>
    </div>
  )
}
export default Notfound
