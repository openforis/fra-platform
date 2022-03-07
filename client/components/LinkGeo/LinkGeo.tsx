import './linkGeo.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

const getPath = (countryIso: string) => {
  if (countryIso) {
    return `/${countryIso}/geo`
  }
  // default to Global
  return '/WO/geo'
}

type Props = {
  countryIso: string
}

const LinkGeo: React.FC<Props> = (props) => {
  const { countryIso } = props

  return (
    <NavLink to={getPath(countryIso)} className="app-header-link-geo" exact>
      <p>GEO</p>
    </NavLink>
  )
}

export default LinkGeo
