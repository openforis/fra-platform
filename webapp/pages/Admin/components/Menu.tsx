import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { useI18n } from '@webapp/components/hooks'

const sections = [
  {
    name: 'usersManagement',
    labelKey: 'landing.sections.userManagement',
  },
  {
    name: 'dataExport',
    labelKey: 'common.dataExport',
  },
  {
    name: 'versioning',
    labelKey: 'landing.sections.versioning',
  },
]

const Menu = () => {
  const i18n = useI18n()
  const { url } = useRouteMatch()

  return (
    <div className="landing__page-menu">
      {sections.map(({ name, labelKey }) => (
        <NavLink to={`${url}/${name}/`} className="landing__page-menu-button" activeClassName="disabled" key={name}>
          {i18n.t(labelKey)}
        </NavLink>
      ))}
    </div>
  )
}

export default Menu
