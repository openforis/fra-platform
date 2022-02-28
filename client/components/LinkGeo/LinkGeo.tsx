import './linkGeo.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkGeo: React.FC = () => (
  <NavLink to="/geo" className="app-header-link-geo" exact>
    <p>GEO</p>
  </NavLink>
)

export default LinkGeo
