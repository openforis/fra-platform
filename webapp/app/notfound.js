import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Notfound = () => {
  const { countryIso } = useParams()

  return (
    <div className="notfound">
      <img src="/img/tucan.svg" alt="tucan" />
      <p className="subhead"><strong>Page not found</strong></p>
      <Link to={`/country/${countryIso}`}>
        Back to main page
      </Link>
    </div>
  )
}
export default Notfound
