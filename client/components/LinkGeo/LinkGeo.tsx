import './linkGeo.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { Global } from '@meta/area'

const getPath = (countryIso: string) => {
  if (countryIso) {
    return `/${countryIso}/geo`
  }
  // default to Global
  return `/${Global.WO}/geo`
}

type Props = {
  countryIso: string
}

const LinkGeo: React.FC<Props> = (props) => {
  const { countryIso } = props

  return (
    <NavLink end to={getPath(countryIso)} className="app-header-link-geo">
      <p>GEO</p>
    </NavLink>
  )
}

export default LinkGeo
