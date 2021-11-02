import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { useI18n } from '@webapp/hooks'

const sections = [
  {
    name: 'usersManagement',
    labelKey: 'landing.sections.userManagement',
  },
  {
    name: 'dataExport',
    labelKey: 'common.dataExport',
  },
]
const Menu = () => {
  const i18n = useI18n()
  const { url } = useRouteMatch()
  return (
    <div className="landing__page-menu">
      {sections.map(({ name, labelKey }) => (
        <NavLink to={`${url}/${name}/`} className="btn landing__page-menu-button" activeClassName="disabled" key={name}>
          {(i18n as any).t(labelKey)}
        </NavLink>
      ))}
    </div>
  )
}
export default Menu
