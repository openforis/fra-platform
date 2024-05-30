import './Admin.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Outlet } from 'react-router-dom'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Routes, SectionNames } from 'meta/routes'
import { Users } from 'meta/user'

import { useCountries } from 'client/store/area'
import { useUser } from 'client/store/user'

type Section = {
  labelKey: string
  name: string
}

const sections: Array<Section> = [
  {
    name: SectionNames.Admin.countries,
    labelKey: 'common.countries',
  },
  {
    name: SectionNames.Admin.invitations,
    labelKey: 'common.invitations',
  },
  {
    name: SectionNames.Admin.userManagement,
    labelKey: 'landing.sections.userManagement',
  },
  {
    name: SectionNames.Admin.links,
    labelKey: 'landing.links.links',
  },
  // { name: 'dataExport', labelKey: 'common.dataExport' },
]

const Admin: React.FC = () => {
  const { t } = useTranslation()
  const countries = useCountries()
  const user = useUser()

  if (!Users.isAdministrator(user)) return <Navigate replace to={Routes.Root.path.absolute} />

  if (Objects.isEmpty(countries)) return null

  return (
    <div className="admin-view">
      <div className="admin__page-header">
        <h1 className="admin__page-title">{t('admin.admin')}</h1>
      </div>

      <div className="admin__page-menu">
        {sections.map(({ name, labelKey }) => (
          <NavLink
            key={name}
            className={(navData) =>
              classNames('btn admin__page-menu-button', {
                disabled: navData.isActive,
              })
            }
            to={name}
          >
            {t(labelKey)}
          </NavLink>
        ))}
      </div>

      <div className="admin__page-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
